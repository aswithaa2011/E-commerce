import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../model/Category.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const categories = [
  { name: "Lipstick",     slug: "lipstick"     },
  { name: "Eye Makeup",   slug: "eye-makeup"   },
  { name: "Foundation",   slug: "foundation"   },
  { name: "Skincare",     slug: "skincare"     },
  { name: "Highlighter",  slug: "highlighter"  },
  { name: "Setting Spray",slug: "setting-spray"},
  { name: "Concealer",    slug: "concealer"    },
  { name: "Eyebrow",      slug: "eyebrow"      },
];

await Category.insertMany(categories);
console.log("Categories seeded!");
await mongoose.disconnect();
