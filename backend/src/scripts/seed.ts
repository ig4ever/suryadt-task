import bcrypt from "bcryptjs"
import { connectDB, disconnectDB } from "../config/database"
import { Owner } from "../models/owner.model"
import { Category } from "../models/category.model"
import { Pet } from "../models/pet.model"
import { User } from "../models/user.model"

export const seedData = async () => {
  await Promise.all([
    Owner.syncIndexes(),
    Category.syncIndexes(),
    Pet.syncIndexes(),
    User.syncIndexes(),
  ])

  await Promise.all([
    Pet.deleteMany({}),
    Owner.deleteMany({}),
    Category.deleteMany({}),
    User.deleteMany({ username: "demo" }),
  ])

  const category = await Category.create({ name: "Cat" })

  const owners = await Owner.insertMany([
    { firstName: "John", lastName: "Lennon", description: "", favorites: false, isMaster: false },
    { firstName: "Paul", lastName: "McCartney", description: "", favorites: false, isMaster: false },
    { firstName: "George", lastName: "Harrison", description: "", favorites: false, isMaster: false },
    { firstName: "Ringo", lastName: "Starr", description: "", favorites: false, isMaster: false },
  ])

  const paul = owners.find(o => o.firstName === "Paul" && o.lastName === "McCartney") as any
  await Pet.insertMany([
    { masterId: paul._id, categoryId: (category as any)._id, name: "Snowball", dob: "2021-11-01" },
    { masterId: paul._id, categoryId: (category as any)._id, name: "Blackly", dob: "2023-08-01" },
  ])

  const hash = await bcrypt.hash("password", 10)
  await User.create({ username: "demo", password: hash })

  const counts = await Promise.all([
    Owner.countDocuments({}),
    Pet.countDocuments({}),
    Category.countDocuments({}),
    User.countDocuments({ username: "demo" }),
  ])

  console.log(JSON.stringify({ owners: counts[0], pets: counts[1], categories: counts[2], users: counts[3] }))
}

const seed = async () => {
  await connectDB()
  await seedData()
  await disconnectDB()
}

if (require.main === module) {
  seed().catch(async (e) => { console.error(e); await disconnectDB(); process.exit(1) })
}