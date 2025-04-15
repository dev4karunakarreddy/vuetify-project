<template>
  <div class="pa-4 text-right">
    <v-dialog v-model="dialog" max-width="600" @click:outside="resetForm">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Add Customer"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-card prepend-icon="mdi-account" :title="isEdit ? 'Edit Customer' : 'Add Customer'">
        <v-card-text>
          <v-form ref="formRef" @submit.prevent="saveCustomer">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  label="First name*"
                  v-model="form.firstName"
                  :rules="[requiredRule]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Last name*"
                  v-model="form.lastName"
                  :rules="[requiredRule]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Email*"
                  v-model="form.email"
                  :rules="[requiredRule, emailRule]"
                  required
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Mobile*"
                  v-model="form.mobile"
                  :rules="[requiredRule, mobileRule]"
                  required
                />
              </v-col>
            </v-row>
            <small class="text-caption text-medium-emphasis">
              * indicates required field
            </small>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="closeDialog" />
          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="saveCustomer"
            :loading="isSaving"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineExpose } from 'vue'
import { useCreateCustomer, useUpdateCustomer } from '../services/CustomerService.ts'
import type { Customer } from '@/models/Model.ts'

const dialog = ref(false)
const isEdit = ref(false)
const isSaving = ref(false)
const formRef = ref()

const form = reactive<Customer>({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  mobile: ''
})

const requiredRule = (value: string) => !!value || 'This field is required'
const emailRule = (value: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(value) || 'Invalid email format'
}
const mobileRule = (value: string) => {
  const pattern = /^[0-9]{10,15}$/
  return pattern.test(value) || 'Invalid mobile number'
}

const { mutate: createMutate, isPending: isCreating } = useCreateCustomer()
const { mutate: updateMutate, isPending: isUpdating } = useUpdateCustomer()

const saveCustomer = async () => {
  const { valid } = await formRef.value.validate()
  
  if (!valid) return

  isSaving.value = true
  
  try {
    const formData = {
      id: form.id,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim()
    }
    console.log(formData)
    if (isEdit.value) {
      await updateMutate({ id: form.id, customer: formData })
    } else {
      await createMutate(formData)
    }
    
    dialog.value = false
    resetForm()
  } catch (error) {
    console.error('Error saving customer:', error)
  } finally {
    isSaving.value = false
  }
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const resetForm = () => {
  formRef.value?.reset()
  form.id = ''
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.mobile = ''
  isEdit.value = false
}

function openDialog(customer?: Customer) {
  if (customer) {
    form.id = customer.id
    form.firstName = customer.firstName
    form.lastName = customer.lastName
    form.email = customer.email
    form.mobile = customer.mobile
    isEdit.value = true
  } else {
    resetForm()
  }
  dialog.value = true
}

defineExpose({
  openDialog
})
</script>