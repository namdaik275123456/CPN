<template>
    <div class="sidebar">
		<!-- Header -->
		<div class="sidebar-header">
			<img src="/images/icon-cpanel.png" alt="Logo" class="logo" />
			<div class="app-name">cPanel</div>
		</div>

		<!-- Menu -->
		<div class="menu-container">
			<ul class="menu-list">
				<router-link
					v-for="(item, index) in routes"
					:key="index"
					:to="item.path"
					v-slot="{ navigate, isActive }"
					custom
				>
				<li :class="['menu-item', { active: isActive }]" @click="navigate">
					<i :class="item.meta.icon" class="menu-icon"></i>
					<span class="menu-text">{{ item.meta.title }}</span>
				</li>
			</router-link>
			</ul>
		</div>

		<!-- Footer -->
		<div class="sidebar-footer">
			&copy; 2025 FPT Polytechnic International
		</div>
    </div>
</template>


<script>
  export default {
    name: 'SidebarMenu',
    props: {
      routes: {
        type: Array,
        required: true,
        default: () => []
      }
    }
  };
</script>

<style lang="scss" scoped>
@use '@/scss/_variables.scss';
@use '@/scss/_layout.scss';

.sidebar {
  width: 250px;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  padding: 15px;
  transition: width 0.3s ease-in-out;
}

/* Sidebar Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 127, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
}

.logo {
  width: 48px;
  height: 48px;
  transition: transform 0.3s ease-in-out;
}

.logo:hover {
  transform: scale(1.1);
}

.app-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  transition: color 0.3s ease;
}

/* Sidebar Menu */
.menu-container {
  flex: 1;
  width: 100%;
  margin-top: 15px;
}

.menu-list {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  gap: 12px;
}

.menu-icon {
  flex-shrink: 0;
  font-size: 20px;
  width: 24px;
  text-align: center;
}

/* Active State */
.menu-item.active {
  background: linear-gradient(135deg, #ff7f00, #ff9f40);
  color: white;
  font-weight: 600;
  border-left: 4px solid #ff4500;
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}

.menu-item.active .menu-icon {
  color: white;
}

/* Hover Effect */
.menu-item:not(.active):hover {
  background: rgba(255, 127, 0, 0.15);
  color: #ff7f00;
  transform: translateX(5px);
  transition: all 0.3s ease-in-out;
}

.menu-item:not(.active):hover .menu-icon {
  color: #ff7f00;
}

/* Default Color */
.menu-item:not(.active) {
  color: #333;
}

.menu-item:not(.active) .menu-icon {
  color: #777;
}

/* Sidebar Footer */
.sidebar-footer {
  padding-top: 15px;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 14px;
  color: #888;
}

/* Responsive Sidebar */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
    align-items: center;
  }

  .app-name {
    display: none;
  }

  .menu-item {
    justify-content: center;
    padding: 12px;
  }

  .menu-item .menu-text {
    display: none;
  }

  .sidebar-footer {
    font-size: 12px;
  }
}

</style>
