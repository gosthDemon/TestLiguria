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
            if (window.innerWidth > 992) {
                this.isBodyExpanded = true;
            }
        },
        toggleProfile() {
            this.isProfileOpen = !this.isProfileOpen;
        },
        handleToggleMenu() {
            this.isMenuClosed = !this.isMenuClosed;
            if (window.innerWidth > 992) {
                this.isBodyExpanded = !this.isBodyExpanded;
            }
        },
    },
    mounted() {
        if (window.innerWidth < 992) {
            this.isMenuClosed = true;
            this.isBodyExpanded = true;
        }
    },
};
</script>
