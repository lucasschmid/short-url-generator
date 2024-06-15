import { Model, DataTypes, Sequelize } from 'sequelize';

class Url extends Model {
    public id!: number;
    public originalUrl!: string;
    public shortUrl!: string;
    public userId!: number | null;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public click!: number;

    static initModel(sequelize: Sequelize): void {
        Url.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            originalUrl: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            shortUrl: {
                type: DataTypes.STRING(6),
                allowNull: false,
                unique: true,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: true,
                references: {
                    model: 'Users', // Nome da tabela de referência
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            click: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            modelName: 'Url',
            tableName: 'Urls',
            timestamps: true,
            paranoid: true,
        });
    }

    static associate(models: any) {
        Url.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    }
}

export default Url;