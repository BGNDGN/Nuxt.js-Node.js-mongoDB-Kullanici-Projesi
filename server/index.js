import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://burakgundogan:ekmek3456@burakgundogan.jubqn.mongodb.net/?retryWrites=true&w=majority&appName=burakgundogan";
const client = new MongoClient(uri);

const app = express();

app.use(cors());
app.use(express.json());

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

let usersCollection;

async function initializeDatabase() {
  try {
    await client.connect();
    const dataBase = client.db('myDatabase');
    usersCollection = dataBase.collection('users');
    console.log("Veri tabanina basariyla baglanildi.");
  } catch (error) {
    console.error("Veri tabanina bagalnirken bir hata olustu:", error);
    process.exit(1); 
  }
}

initializeDatabase();

app.get("/api/users", async (req, res) => { 
  try {
    const users = await usersCollection.find({}).toArray();
    res.status(200).json({ success: true, data: users });

  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ success: false, message: error });
  }
 })

app.put("/api/users/:id", (req, res) => { 
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;

    if(!ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Gecersiz Kullanici." });
    };

    const result = usersCollection.updateOne({ _id: new ObjectId(id) }, { $set: {name,email,age} });

    if(result.matchedCount === 0) {
      return res.status(400).json({ success: false, message: "Kullanici bulunamadi." });
    }
    
    res.status(200).json({ success: true, message: "Kullanici basariyla güncellendi." });

  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ success: false, message: 'Bir hata oluştu.' });
  }
});

app.post("/api/users", (req,res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const age = req.body.age;

    if(!name || !email || !age) {
      res.status(400).json({ success: false, message: "Kullanici olusturulurken girdiginiz bilgilerle uyumsuzluk saglandi." });
    }

    const result = usersCollection.insertOne({ name,email,age });

    if(result.acknowledged) {
      res.status(200).json({ success: true, message: "Kullanici basariyla eklendi." });
    } else {
      res.status(200).json({ success: false, message: "Kullanici eklenemedi.." });
    }

  } catch (error) {
    console.error("Hata:", error);
    res.status(400).json({ succes: false, message: "Bir hata olustu." });
  }
});

app.delete("/api/users/:id", (req, res) => {
  try {
    const id = req.params.id;

    if(!ObjectId.isValid(id)) {
      res.status(401).json({ success: false, message: "ID'ye ait kullanici bulunanmadi." });
    }

    const result = usersCollection.deleteOne({ _id: new ObjectId(id) });

    if(result.deletedCount === 0) {
      return res.status(401).json({ success: false, message: "Kullanici silinirken bir hata olustu." });
    }

    res.status(200).json({ success: true, message: "Kullanici basariyla silindi." });

  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ success: false, message: 'Bir hata oluştu.' });
  }
});