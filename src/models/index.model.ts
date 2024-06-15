import { sequelize } from '../config/database.config';
import User from './user.model';
import Url from './url.model';

User.initModel(sequelize);
Url.initModel(sequelize);

export { sequelize, User, Url };