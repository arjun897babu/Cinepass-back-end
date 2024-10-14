import { Period } from "./enum";

function generateRevenueFilterQuery(period:Period) {
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


export {
  generateRevenueFilterQuery,
  generatePeriodQuery
}