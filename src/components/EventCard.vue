<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <span>@ {{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.event-link {
  display: block;
  text-decoration: none;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #384df1;
  max-width: 400px;
  width: 90vw;
  padding: 20px;
  transition: all 0.3s ease;
  color: #384df1;
}
.event-link:hover {
  box-shadow: 0 0 15px 0 rgba(155, 57, 57, 0.3);
}
.event-card {
}
</style>
