<template>
    <section id="profile-section" :class="{ 'open-profile': isProfileOpen }">
        Hola
        <div
            class="button-profile-closse"
            id="button-profile-close"
            @click="$emit('close-profile')"
        >
            <button><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="container-profile-image">
            <img src="{{ URL::asset('img\interface\user.webp') }}" alt="" />
        </div>
        <div class="action-bars">
            <i class="fal fa-bell"></i>
            <i class="fal fa-envelope"></i>
            <i class="fal fa-moon"></i>
            <!-- <i class="fal fa-sign-out"></i> -->
        </div>
    </section>
</template>

<script>
export default {
    name: "ProfileSection",
    props: ["isProfileOpen"],
};
</script>
