import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel(sequelize: Sequelize): void {
        User.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true,
        });
    }

    static associate(models: any) {
        User.hasMany(models.Url, {
            foreignKey: 'id',
            as: 'urls',
        });
    }
}

export default User;

