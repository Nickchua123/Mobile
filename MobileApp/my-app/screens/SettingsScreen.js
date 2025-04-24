import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [sales, setSales] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);
  const [name, setName] = useState("Bruno Pham");
  const [email, setEmail] = useState("bruno203@gmail.com");
  const [password, setPassword] = useState("12345678");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Personal Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity onPress={() => setEditProfileVisible(true)}>
              <Ionicons name="pencil" size={18} color="#555" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}><Text>Name</Text><TextInput style={styles.input} value={name} editable={false} /></View>
          <View style={styles.inputBox}><Text>Email</Text><TextInput style={styles.input} value={email} editable={false} /></View>
        </View>

        {/* Password */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Password</Text>
            <TouchableOpacity onPress={() => setEditPasswordVisible(true)}>
              <Ionicons name="pencil" size={18} color="#555" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputBox}><Text>Password</Text><TextInput style={styles.input} value={"*".repeat(password.length)} secureTextEntry editable={false} /></View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.toggleRow}><Text>Sales</Text><Switch value={sales} onValueChange={setSales} /></View>
          <View style={styles.toggleRow}><Text>New arrivals</Text><Switch value={newArrivals} onValueChange={setNewArrivals} /></View>
          <View style={styles.toggleRow}><Text>Delivery status changes</Text><Switch value={deliveryStatus} onValueChange={setDeliveryStatus} /></View>
        </View>

        {/* Help Center */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.helpRow}>
            <Text style={styles.sectionTitle}>FAQ</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editProfileVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Personal Info</Text>
            <TextInput style={styles.modalInput} value={name} onChangeText={setName} placeholder="Name" />
            <TextInput style={styles.modalInput} value={email} onChangeText={setEmail} placeholder="Email" />
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setEditProfileVisible(false)} style={styles.modalButton}><Text style={styles.modalButtonText}>Save</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Password Modal */}
      <Modal visible={editPasswordVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput style={styles.modalInput} secureTextEntry value={password} onChangeText={setPassword} placeholder="New Password" />
            <View style={styles.modalButtons}>
              <Pressable onPress={() => setEditPasswordVisible(false)} style={styles.modalButton}><Text style={styles.modalButtonText}>Save</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  section: { backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '500', marginBottom: 10 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  inputBox: { marginBottom: 10 },
  input: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, marginTop: 4 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  helpRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '85%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalInput: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  modalButton: { backgroundColor: '#000', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  modalButtonText: { color: '#fff', fontWeight: 'bold' },
});