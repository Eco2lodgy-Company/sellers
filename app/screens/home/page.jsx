// App.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomePage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vendor Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddProduct')}>
          <Icon name="plus" size={25} color="#fff" />
          <Text style={styles.actionText}>Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Orders')}>
          <Icon name="list" size={25} color="#fff" />
          <Text style={styles.actionText}>View Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Orders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {/* Example Order Item */}
        <View style={styles.orderItem}>
          <Text style={styles.orderText}>Order #12345</Text>
          <Text style={styles.orderText}>Status: Delivered</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.orderText}>Order #12346</Text>
          <Text style={styles.orderText}>Status: Pending</Text>
        </View>
      </View>

      {/* Product Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Overview</Text>
        {/* Example Product Item */}
        <View style={styles.productItem}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.productImage} />
          <Text style={styles.productText}>Product Name</Text>
          <Text style={styles.productText}>Stock: 10</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  orderText: {
    fontSize: 16,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  productText: {
    fontSize: 16,
  },
});

export default HomePage;