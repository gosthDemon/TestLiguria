<template>
    <div>
        <profile-section
            :isProfileOpen="isProfileOpen"
            @close-profile="toggleProfile"
        ></profile-section>
        <menu-section
            :isMenuClosed="isMenuClosed"
            @close-menu="handleCloseMenu"
        ></menu-section>
        <body-section
            :isBodyExpanded="isBodyExpanded"
            @toggle-menu="handleToggleMenu"
            @toggle-profile="toggleProfile"
        ></body-section>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import ProfileSection from "./ProfileSection.vue";
import MenuSection from "./MenuSection.vue";
import BodySection from "./BodySection.vue";

export default {
    name: "MainTemplate",
    components: {
        ProfileSection,
        MenuSection,
        BodySection,
    },
    data() {
        return {
            isMenuClosed: false,
            isProfileOpen: false,
            isBodyExpanded: false,
        };
    },
    methods: {
        handleCloseMenu() {
            this.isMenuClosed = true;
            this.isBodyExpanded = true;
        },
        toggleProfile() {
            this.isProfileOpen = !this.isProfileOpen;
        },
        handleToggleMenu() {
            this.isMenuClosed = !this.isMenuClosed;
            this.isBodyExpanded = !this.isBodyExpanded;
        },
    },
};
</script>
