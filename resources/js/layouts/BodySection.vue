<template>
    <section id="body-section" :class="{ 'expand-body': isBodyExpanded }">
        <div class="navbar">
            <nav id="navbar">
                <i class="far fa-bars" @click="$emit('toggle-menu')"></i>
                <input
                    type="text"
                    class="input-search"
                    placeholder="Search..."
                />
                <div class="action-bars">
                    <div
                        class="profile-picture-container"
                        @click="$emit('toggle-profile')"
                    >
                        <img
                            src="{{ URL::asset('img/interface/user.webp') }}"
                            alt=""
                        />
                    </div>
                </div>
            </nav>
        </div>
        <div class="body">
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
export default {
    name: "BodySection",
    props: {
        isBodyExpanded: Boolean,
    },
};
</script>
