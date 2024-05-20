import { createApp } from 'vue';
const eventBus = createApp({});
export const EventBus = eventBus.config.globalProperties;