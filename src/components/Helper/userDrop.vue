<script setup>
import userIcon from "../../assets/images/usely/user.png"

defineProps({
  image_url: {
    type: String,
    required: false,
    default: userIcon
  },
  username: {
    type: String,
    required: true
  }
});

const logout = () => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  window.location.reload();
}
</script>

<template>
  <div class="dropdown dropdown-bottom flex items-center">
    <div tabindex="0" role="button" class="flex items-center cursor-pointer border-2 border-[#0056D2] rounded-full p-2">
      <img :src="image_url" alt="User Profile" style="object-fit: cover;" class="w-8 h-8 rounded-full mr-2" />
      <span class="font-bold mr-2 text-sm">{{ username }}</span>
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] flex flex-col shadow">
      <router-link to="/myCourses"><li><a><i class="fas fa-graduation-cap"></i> Mes Cours</a></li></router-link>
      <router-link to="/profile"><li><a><i class="fas fa-user"></i> Profil</a></li></router-link>
      <router-link to="/settings"><li><a><i class="fas fa-cog"></i> Paramètres</a></li></router-link>
      <router-link to="/notifications"><li><a><i class="fas fa-bell"></i> Notifications</a></li></router-link>
      <li><a @click="logout"><i class="fas fa-power-off"></i> Déconnexion</a></li>
    </ul>
  </div>
</template>