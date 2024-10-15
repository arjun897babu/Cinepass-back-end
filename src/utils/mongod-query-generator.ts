import { Period } from "./enum";
import { RevenueDetails } from "./interface";

function generateRevenueFilterQuery(period: Period) {
  switch (period) {
    case 'week':
      return {
        $arrayToObject: {
          $map: {
            input: { $range: [1, 8] },
            as: 'day',
            in: {
              k: { $toString: '$$day' },
              v: {
                $sum: {
                  $cond: [
                    { $eq: ['$_id.period', '$$day'] },
                    '$total',
                    0
                  ]
                }
              }
            }
          }
        }
      };

    case 'month':
      return {
        $arrayToObject: {
          $map: {
            input: { $range: [1, 32] },
            as: 'day',
            in: {
              k: { $toString: '$$day' },
              v: {
                $sum: {
                  $cond: [
                    { $eq: ['$_id.period', '$$day'] },
                    '$total',
                    0
                  ]
                }
              }
            }
          }
        }
      };

    case 'year':
      return {
        $arrayToObject: {
          $map: {
            input: { $range: [1, 13] },
            as: 'month',
            in: {
              k: { $toString: '$$month' },
              v: {
                $sum: {
                  $cond: [
                    { $eq: ['$_id.period', '$$month'] },
                    '$total',
                    0
                  ]
                }
              }
            }
          }
        }
      };

    default:
      null
  }
}


function generatePeriodQuery(period: Period) {
  switch (period) {
    case 'week':
      return {
        $dayOfWeek: '$bookingDate'
      }
    case 'month':
      return {
        $dayOfMonth: '$bookingDate'
      }
    case 'year':
      return {
        $month: '$bookingDate'
      }
    default:
      return {
        $dayOfWeek: '$bookingDate'
      }
  }
}


function mergeRevenueData(revenue: RevenueDetails[]): RevenueDetails {
  return revenue.reduce((acc: RevenueDetails, current: RevenueDetails) => {
    acc.name = current.name;
    acc.id = current.id;
    if (!acc.data) {
      acc.data = {};
    }

    for (const key in current.data) {
      if (current.data.hasOwnProperty(key)) {
        acc.data[key] = (acc.data[key] || 0) + current.data[key];
      }
    }

    return acc;
  }, { id: '', name: '', data: {} } as RevenueDetails);
}


function getDefaultData(period: Period) {
  const length = period === Period.YEAR ? 12 : period === Period.MONTH ? 31 : 7
  const defaultData = {}
  for (let i = 0; i <= length; i++) {
    Object.assign(defaultData, { [i + 1]: 0 })
  }
  return defaultData
}

export {
  mergeRevenueData,
  getDefaultData,
  generateRevenueFilterQuery,
  generatePeriodQuery
}