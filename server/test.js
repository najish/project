const {sequelize, User, Product, Order, Address}= require('./models/associations')


const fetchData = async () => {
    try {


        




        await sequelize.query('select * from users where id = 1')



        // const users = await User.findAll({raw: true})
        // console.log("helllo from data")
        // console.log(users)



        // const user = await User.findByPk(1, {raw: true})
        // console.log(user)



        // const x = await sequelize.query('select * from users')
        // console.log(x)





    } 
    catch(err) {
        console.log(err)
    }
}


fetchData()