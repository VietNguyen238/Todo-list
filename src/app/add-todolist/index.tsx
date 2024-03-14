import React, { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CheckBox from "react-native-check-box";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

export default function Page() {
  const { top } = useSafeAreaInsets();

  const mutation = useMutation({
    onSuccess: () => {
      console.log("success");
      reset();
      Toast.show({
        type: "success",
        text1: "Thêm thành công",
      });
    },
    mutationFn: (newTodolist) => {
      return axios.post(
        "https://65f2b005034bdbecc7659037.mockapi.io/todolist",
        newTodolist
      );
    },
  });

  const state = false;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const dataPost = { ...data };
    mutation.mutate(dataPost);
  };

  return (
    <ScrollView>
      <View
        className='flex items-center flex-1 px-4 lg:px-6 bg-[#F6F6F6]'
        style={{ padding: top + 10 }}
      >
        <View className='flex flex-row items-center justify-between w-full mb-2'>
          <Link href='/'>
            <Ionicons className='' name='chevron-back' size={20} />
          </Link>
          <Text className='text-2xl'>Add Todo List</Text>
          <TouchableOpacity
            onPress={() => {
              reset();
            }}
          >
            <Ionicons className='' name='trash' size={20} />
          </TouchableOpacity>
        </View>

        <Controller
          name='title'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text className=''>Title *</Text>
              <View className=' mt-[10px] flex flex-row items-center border bg-white border-gray-300 h-[50px] w-full rounded-xl p-2 px-4 '>
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className='flex-1'
                />
              </View>
            </View>
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className='w-full mt-10 h-14 bg-black my-4 flex items-center justify-center rounded-2xl'
        >
          <View>
            <View className='flex flex-row items-center gap-1'>
              <Ionicons className='' name='add' size={17} color='white' />
              <Text className='text-white text-[14px]'>Add Todo List</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
