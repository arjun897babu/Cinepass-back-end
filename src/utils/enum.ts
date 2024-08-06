enum Role {
  users = 'users',
  admin = 'admin',
  theaters = 'theaters'
};

enum AuthSource {
  SELF = 'self',
  GOOGLE = 'google'
}

enum MovieType {
  THEATER='Theater',
  STREAM='Stream'
}

export {
  Role,
  AuthSource,
  MovieType
}