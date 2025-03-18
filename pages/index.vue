<template>
  <div class="container">
    <h1 class="title">Kullanıcılar</h1>
    <hr>

    <div v-if="users && users.length">
      <ul class="user-list">
        <li v-for="user in users" :key="user._id" class="user-item">
          <strong>Ad:</strong> {{ user.name }} <br />
          <strong>Email:</strong> {{ user.email }} <br />
          <strong>Yaş:</strong> {{ user.age }}
          <button class="deleteButton" @click="deletee(user._id)">Sil</button>
          <button class="editButton" @click="edit(user)">Düzenle</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Hiç kullanıcı bulunamadı.</p>
    </div>

    <div id="newUserContainer">
      <h2>Yeni Kullanici Ekle</h2>
      <form id="newUserMainContainer" @submit.prevent="addUser">
        <div>
          <label class="nameText">Ad:</label>
          <input class="name" type="text" v-model="newUser.userName">
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="newUser.userEmail">
        </div>
        <div>
          <label class="ageText">Yaş:</label>
          <input class="age" type="number" v-model="newUser.userYas">
        </div>
        <div id="newUserContainerButton">
          <button>Yeni Kullaniciyi Ekle</button>
        </div>
      </form>
    </div>

    <div id="editUserContainer" v-if="updateUser && updateUser.id">
      <h2>Kullaniciyi Düzenle</h2>
      <form id="editUserMainContainer" @submit.prevent="submitUpdate" >
        <div>
          <label class="newUserName">Ad:</label>
          <input type="text" v-model="updateUser.userName" />
        </div>

        <div>
          <label class="newUserEmail">Email:</label>
          <input type="email" v-model="updateUser.userEmail" />
        </div>

        <div>
          <label class="newUserAge">Yaş:</label>
          <input type="number" v-model="updateUser.userYas" />
        </div>

        <div id="newUserButton">
          <button>Güncelle</button>
        </div>
      </form>
    </div>
    <div id="velseUpdateUser" v-else>
      <p>Düzenleyeceğiniz Kullanıcıyı <strong>"Kullanıcılar"</strong> Bölümünden Seçip <strong>"Düzenle"</strong> Butonuna Basın".</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "@/assets/index.css"

export default {
  data() {
    return {
      users: [],
      updateUser: { id: "", userName: "", userEmail: "", userYas: "" },
      newUser: { userName:"", userEmail:"", userYas: "" }
    };
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        this.users = response.data.data;
      } catch (error) {
        console.error("API çağrısı sırasında hata:", error);
        this.users = [];
      }
    },

    edit(user) {
      this.updateUser = { id: user._id, userName: user.name, userEmail: user.email, userYas: user.age };
    },

    async submitUpdate() {
      try {
        const { id, userName, userEmail, userYas } = this.updateUser;
        await axios.put(`http://localhost:3001/api/users/${id}`, { name: userName, email: userEmail, age: userYas });
        alert("Kullanıcı başarıyla güncellendi.");
        this.updateUser = {userName: '', userEmail: '', userYas: ''};
        await this.fetchUsers(); 
      } catch (error) {
        alert("Bir hata oluştu: " + error.message);
      }
    },

    async addUser() {
      try {
        const { userName, userEmail, userYas } = this.newUser;
        await axios.post(`http://localhost:3001/api/users`, { name: userName, email: userEmail, age: userYas});
        alert("Kullanici basariyla eklendi.");
        this.newUser = {userName: '', userEmail: '', userYas: ''};
        await this.fetchUsers();
      } catch (error) {
        alert("Bir hata oluştu: " + error.message);
      }
    },

    async deletee(id) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${id}`);
        alert("Kullanici basariyla silindi.");
        await this.fetchUsers();
      } catch (error) {
        alert("Bir hata oluştu: " + error.message);
      }
    }
  },

  async mounted() {
    await this.fetchUsers();
  },
};
</script>
