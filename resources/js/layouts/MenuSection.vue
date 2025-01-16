<template>
    <section id="menu-section" :class="{ 'close-menu': isMenuClosed }">
        <div class="header">
            <div class="logo">
                <!-- Logo -->
            </div>
            <div class="button-menu-close" @click="closeMenu">
                <button>
                    <i class="fas fa-chevron-left"></i>
                </button>
            </div>
        </div>
        <div class="menu">
            <div
                v-for="(item, index) in menuItems"
                :key="index"
                class="menu-item"
            >
                <!-- Menú Simple -->
                <template v-if="!item.isMultiple">
                    <div class="simple" @click="navigateTo(item.link)">
                        <i :class="['fal', item.icon]"></i> {{ item.title }}
                    </div>
                </template>

                <!-- Menú Múltiple -->
                <template v-else>
                    <div class="multiply">
                        <div class="item" @click="toggleSubMenu(index)">
                            <i :class="['fal', item.icon]"></i> {{ item.title }}
                            <i class="fal fa-chevron-left arrow"></i>
                        </div>
                        <ul
                            class="sub-menu"
                            :style="{
                                height: item.isOpen
                                    ? item.subMenuHeight + 'px'
                                    : '0px',
                            }"
                        >
                            <li
                                v-for="(subItem, subIndex) in item.subMenu"
                                :key="subIndex"
                                class="sub-menu-item"
                                @click="navigateTo(subItem.link)"
                            >
                                <i class="fas fa-circle"></i>
                                {{ subItem.title }}
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "MenuSection",
    props: {
        isMenuClosed: Boolean,
    },
    data() {
        return {
            menuItems: [
                {
                    title: "Dashboard",
                    isMultiple: false,
                    link: "/dashboard",
                    icon: "fa-analytics",
                },
                {
                    title: "Puertas",
                    isMultiple: true,
                    icon: "fa-door-closed",
                    isOpen: false,
                    subMenuHeight: 0,
                    subMenu: [
                        { title: "Nueva", link: "/solicitud-puerta/create" },
                        { title: "Registros", link: "/solicitud-puerta/table" },
                    ],
                },
            ],
        };
    },
    methods: {
        closeMenu() {
            this.$emit("close-menu");
        },
        toggleSubMenu(index) {
            const item = this.menuItems[index];
            if (item.isMultiple) {
                item.isOpen = !item.isOpen;
                if (item.isOpen) {
                    const liHeight = 40;
                    const spacing = 3;
                    item.subMenuHeight =
                        item.subMenu.length * (liHeight + spacing);
                } else {
                    item.subMenuHeight = 0;
                }
            }
        },
        navigateTo(route) {
            this.$router.push(route).catch((err) => {
                if (err.name !== "NavigationDuplicated") {
                    console.error(err);
                }
            });
        },
    },
};
</script>
