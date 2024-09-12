enum Role {
  users = 'users',
  admin = 'admin',
  theaters = 'theaters'
};

enum AuthSource {
  SELF = 'self',
  GOOGLE = 'google'
}

enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

enum BookingStatus {
  BOOKED = 'booked',
  CANCELED = 'canceled'
}
enum PurchasedItem {
  TICKET = 'ticket',
  RENTAL = 'rental'
}

enum MovieType {
  THEATER = 'Theater',
  STREAM = 'Stream'
}

enum ResponseStatus {
  SUCCESS = 'Success',
  ERROR = 'Error',
}

enum ApprovalStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending'
}

enum MovieFilterEnum {
  SEARCH = 'search',
  NOW_SHOWING = 'nowShowing',
  GENRE = 'genre',
  FORMAT = 'format',
  LANGUAGE = 'language'
}
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

enum Formats {
  TWO_D = "2D",
  THREE_D = "3D",
  FOUR_K = "4K",
  IMAX = "IMAX"
}

enum Languages {
  English = 'english',
  Japanese = 'japanese',
  Korean = 'korean',
  Hindi = 'hindi',
  Telugu = 'telugu',
  Tamil = 'tamil',
  Kannada = 'kannada',
  Malayalam = 'malayalam',
}

enum Genres {
  Action = 'action',
  Adventure = 'adventure',
  Comedy = 'comedy',
  Crime = 'crime',
  Drama = 'drama',
  Fantasy = 'fantasy',
  Historical = 'historical',
  Horror = 'horror',
  Musical = 'musical',
  Mystery = 'mystery',
  Romance = 'romance',
  SciFi = 'sci-fi',
  Thriller = 'thriller',
  War = 'war',
  Western = 'western',
  Animation = 'animation',
  Documentary = 'documentary',
}

export {
  Role,
  AuthSource,
  MovieType,
  PaymentStatus,
  ResponseStatus,
  ApprovalStatus,
  MovieFilterEnum,
  Formats,
  Genres,
  Languages,
  BookingStatus,
  PurchasedItem
}