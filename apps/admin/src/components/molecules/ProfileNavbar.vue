<script>
export default {
  emits: ['logout'],
  props: ['user'],
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <label tabindex="0">
      <div
        class="flex items-center gap-5 cursor-pointer hover:bg-slate-200 px-3 py-2 rounded-md"
      >
        <div class="avatar">
          <div class="w-8 rounded-full">
            <img
              src="https://i.postimg.cc/fbC90hSG/2204-w037-n003-302b-p1-302.jpg"
            />
          </div>
        </div>
        <div class="md:block hidden lg:max-w-[180px] max-w-[80px]">
          <p class="font-bold truncate">{{ user?.username }}</p>
          <p class="opacity-50 text-[10px] truncate">{{ user?.email }}</p>
        </div>
      </div>
    </label>
    <ul
      tabindex="0"
      class="dropdown-content menu p-2 shadow bg-base-100 rounded-box translate-y-2"
    >
      <div class="px-4 py-2 md:hidden max-w-[160px]">
        <p class="font-bold truncate">{{ user?.username }}</p>
        <p class="opacity-50 text-[10px] truncate">{{ user?.email }}</p>
      </div>
      <li>
        <div
          class="flex items-center gap-2 py-2 px-4 hover:bg-slate-300 rounded-lg cursor-pointer"
          @click="$emit('logout')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
          <span> Logout </span>
        </div>
      </li>
    </ul>
  </div>
</template>
