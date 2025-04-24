import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { NativeEventEmitter, NativeModules } from 'react-native';

const eventBus = new NativeEventEmitter(NativeModules.UIManager); // ✅ Tạo event bus đúng cách

export default function useCartCount() {
  const [count, setCount] = useState(0);
  const isFocused = useIsFocused();

  const fetchCart = async () => {
    const storedCart = await AsyncStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    if (isFocused) fetchCart();
  }, [isFocused]);

  useEffect(() => {
    const subscription = eventBus.addListener('cartUpdated', fetchCart); // ✅ Thay vì .on
    return () => subscription.remove(); // ✅ cleanup
  }, []);

  return count;
}
