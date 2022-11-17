const port = process.env.PORT || 5000;
import chalk from 'chalk';
import dotenv from "dotenv";
import mongoose from 'mongoose';
dotenv.config();

export default async function connect(fullName, app) {
  try {
    console.log(chalk.bgYellow('Loading...🔌'))
    await mongoose.connect(process.env.MONGO_DATABASE)
    console.clear();
    app.listen(port, () => {
      console.log("*****************************************************************");
      console.log(chalk.rgb(123, 45, 67).underline(`${fullName} You are awesome ✨`))
      console.log(chalk.hex('#89CFF0').bold(`You are connected successfully 📡`))
      console.log(chalk.grey(`Connected port ${port} 📻`))
      console.log("*****************************************************************");
    })
  } catch (error) {
    console.log(chalk.red("Something went totally wrong ⚠️.", error));
  }
}
