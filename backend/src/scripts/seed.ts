import bcrypt from "bcryptjs";
import { connectDB, disconnectDB } from "../config/database";
import { Owner } from "../models/owner.model";
import { Category } from "../models/category.model";
import { Pet } from "../models/pet.model";
import { User } from "../models/user.model";

export const seedData = async () => {
  await Promise.all([
    Owner.syncIndexes(),
    Category.syncIndexes(),
    Pet.syncIndexes(),
    User.syncIndexes(),
  ]);

  await Promise.all([
    Pet.deleteMany({}),
    Owner.deleteMany({}),
    Category.deleteMany({}),
    User.deleteMany({ username: "demo" }),
  ]);

  const categories = await Category.insertMany([
    { name: "Cat" },
    { name: "Dog" },
    { name: "Bird" },
    { name: "Hamster" },
    { name: "Fish" },
  ]);
  const catCategory = categories.find((c: any) => c.name === "Cat") as any;
  const dogCategory = categories.find((c: any) => c.name === "Dog") as any;
  const birdCategory = categories.find((c: any) => c.name === "Bird") as any;
  const hamsterCategory = categories.find(
    (c: any) => c.name === "Hamster"
  ) as any;
  const fishCategory = categories.find((c: any) => c.name === "Fish") as any;

  const owners = await Owner.insertMany([
    {
      firstName: "John",
      lastName: "Lennon",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Paul",
      lastName: "McCartney",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "George",
      lastName: "Harrison",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Ringo",
      lastName: "Starr",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Freddie",
      lastName: "Mercury",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "David",
      lastName: "Bowie",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Elton",
      lastName: "John",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Mick",
      lastName: "Jagger",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Keith",
      lastName: "Richards",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Jim",
      lastName: "Morrison",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Kurt",
      lastName: "Cobain",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Adele",
      lastName: "Adkins",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Taylor",
      lastName: "Swift",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Beyonce",
      lastName: "Knowles",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Ed",
      lastName: "Sheeran",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Bruno",
      lastName: "Mars",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Lady",
      lastName: "Gaga",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Billie",
      lastName: "Eilish",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Drake",
      lastName: "Graham",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Kanye",
      lastName: "West",
      description: "",
      favorites: false,
      isMaster: false,
    },
    {
      firstName: "Sia",
      lastName: "Furler",
      description: "",
      favorites: false,
      isMaster: false,
    },
  ]);

  const byName = (fn: string, ln: string) =>
    owners.find((o) => o.firstName === fn && o.lastName === ln) as any;
  const paul = byName("Paul", "McCartney");
  const john = byName("John", "Lennon");
  const george = byName("George", "Harrison");
  const ringo = byName("Ringo", "Starr");
  const taylor = byName("Taylor", "Swift");
  const adele = byName("Adele", "Adkins");
  await Pet.insertMany([
    // Cats
    {
      masterId: paul._id,
      categoryId: catCategory._id,
      name: "Snowball",
      dob: "2021-11-01",
    },
    {
      masterId: paul._id,
      categoryId: catCategory._id,
      name: "Blackly",
      dob: "2023-08-01",
    },
    {
      masterId: john._id,
      categoryId: catCategory._id,
      name: "Mittens",
      dob: "2020-05-15",
    },
    {
      masterId: george._id,
      categoryId: catCategory._id,
      name: "Whiskers",
      dob: "2019-02-20",
    },
    {
      masterId: ringo._id,
      categoryId: catCategory._id,
      name: "Shadow",
      dob: "2022-07-04",
    },
    {
      masterId: taylor._id,
      categoryId: catCategory._id,
      name: "Luna",
      dob: "2021-03-09",
    },
    {
      masterId: taylor._id,
      categoryId: catCategory._id,
      name: "Leo",
      dob: "2022-12-25",
    },
    {
      masterId: adele._id,
      categoryId: catCategory._id,
      name: "Oliver",
      dob: "2018-10-10",
    },
    // Dogs
    {
      masterId: john._id,
      categoryId: dogCategory._id,
      name: "Buddy",
      dob: "2017-04-12",
    },
    {
      masterId: ringo._id,
      categoryId: dogCategory._id,
      name: "Max",
      dob: "2016-09-30",
    },
    {
      masterId: george._id,
      categoryId: dogCategory._id,
      name: "Bella",
      dob: "2015-06-01",
    },
    // Birds
    {
      masterId: paul._id,
      categoryId: birdCategory._id,
      name: "Kiwi",
      dob: "2020-01-20",
    },
    // Hamsters
    {
      masterId: adele._id,
      categoryId: hamsterCategory._id,
      name: "Nibbles",
      dob: "2022-02-02",
    },
    // Fish
    {
      masterId: taylor._id,
      categoryId: fishCategory._id,
      name: "Bubbles",
      dob: "2023-05-05",
    },
  ]);

  const hash = await bcrypt.hash("password", 10);
  await User.create({ username: "demo", password: hash });

  const counts = await Promise.all([
    Owner.countDocuments({}),
    Pet.countDocuments({}),
    Category.countDocuments({}),
    User.countDocuments({ username: "demo" }),
  ]);

  console.log(
    JSON.stringify({
      owners: counts[0],
      pets: counts[1],
      categories: counts[2],
      users: counts[3],
    })
  );
};

const seed = async () => {
  await connectDB();
  await seedData();
  await disconnectDB();
};

if (require.main === module) {
  seed().catch(async (e) => {
    console.error(e);
    await disconnectDB();
    process.exit(1);
  });
}
