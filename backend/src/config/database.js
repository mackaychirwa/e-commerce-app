import { Sequelize } from 'sequelize';

// Initialize Sequelize instance
const sequelize = new Sequelize('ecommerce', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, 
});
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1); 
    }
};

// initUserModel(sequelize);
export { sequelize, connectDB };
