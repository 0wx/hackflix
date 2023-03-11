<script>
export default {
  props: ['label', 'required', 'type', 'name', 'modelValue'],
}
</script>

<template>
  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="label-text-alt text-red-600">*</span>
    </label>
    <input
      :type="type"
      :placeholder="`Enter ${label}`"
      class="input input-bordered w-full max-w-xs"
      :name="name"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
