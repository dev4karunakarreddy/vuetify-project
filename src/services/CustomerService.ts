import type { Customer } from '@/models/Model'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/customer',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const createCustomer = async (customer: Customer) => {
  console.log(customer)
  const response = await axiosClient.post('', customer)
  return response.data
}

export const getCustomers = async () => {
  const response = await axiosClient.get('')
  return response.data.data
}

export const getCustomerById = async (id: number | string) => {
  const response = await axiosClient.get(`/${id}`)
  return response.data
}

export const updateCustomer = async (id: number | string, customer: Customer) => {
  const response = await axiosClient.put(`/${id}`, customer)
  return response.data
}

export const deleteCustomer = async (id: number | string) => {
  const response = await axiosClient.delete(`/${id}`)
  return response.data
}

export const useCustomers = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers
  })
}


export const useCreateCustomer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, customer }: { id: string | number, customer: Customer }) => 
      updateCustomer(id, customer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })
}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    }
  })
}