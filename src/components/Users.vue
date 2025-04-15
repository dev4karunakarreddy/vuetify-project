<template>
    <v-container>
      <Dialog ref="dialogRef"/>
      <v-card>
        <v-card-title>Customer</v-card-title>
        <v-table height="100%">
          <thead>
            <tr>
              <th class="text-left">First Name</th>
              <th class="text-left">Last Name</th>
              <th class="text-left">Email</th>
              <th class="text-left">Mobile</th>
              <th class="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in customers" :key="item.email">
              <td>{{ item.firstName }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.mobile }}</td>
              <td>
                <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import Dialog from './Dailog.vue'
  import { useCustomers, useDeleteCustomer } from '@/services/CustomerService'

  const { data: customers, isLoading, isError, error } = useCustomers()
  const { mutate: deleteMutate } = useDeleteCustomer()
  const dialogRef = ref(null)

  const editItem = (item) => {
    dialogRef.value.openDialog(item)
  }

  const deleteItem = (item) => {
    deleteMutate(item.id)
  }
  </script>
  