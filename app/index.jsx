import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import { supabase } from '../lib/supabase';
import { Button, Input, Divider } from '@rneui/themed';
import { router } from 'expo-router';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  async function signInWithEmail() {
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      if (error) throw error;
      router.replace('/explore');
    } catch (error) {
      Alert.alert('Erreur de connexion', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    if (!validateInputs()) return;
  
    setLoading(true);
    try {
      // Étape 1 : Créez un compte utilisateur avec Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
  
      if (authError) throw authError; // Gestion de l'erreur d'inscription
  
      // Étape 2 : Vérifiez que `session` et `user` existent
      const userId = data?.user?.id;
      if (!userId) {
        Alert.alert(
          'Inscription réussie',
          'Veuillez vérifier votre boîte mail pour confirmer votre compte !'
        );
        return;
      }
  
      // Étape 3 : Insérez les informations dans la table `users`
      const { data: insertData, error: insertError } = await supabase.from('users').insert([
        {
          id: userId, // Clé étrangère associée
          first_name: prenom,
          last_name: nom,
          tel: telephone,
          address: adresse,
          email: email,
          password: password, // À NE PAS CONSERVER EN CLAIR DANS LA BDD
        },
      ]);
  
      if (insertError) throw insertError; // Gestion des erreurs d'insertion
  
      Alert.alert('Inscription réussie', 'Compte créé avec succès !');
      console.log('Utilisateur inséré dans la table `users` :', insertData);
    } catch (error) {
      Alert.alert('Erreur d\'inscription', error.message);
    } finally {
      setLoading(false);
    }
  }
  

  async function signInWithFacebook() {
<<<<<<< HEAD
    navigation.navigate('onboard');
    router.replace('/onboard');
=======
>>>>>>> 27e7884f37fa46cbbdd57a61203c7862ea7fc056
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: 'yourapp://auth/callback',
        }
      });
      
      if (error) throw error;
    } catch (error) {
      Alert.alert('Erreur Facebook', error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'yourapp://auth/callback',
        }
      });
      
      if (error) throw error;
    } catch (error) {
      Alert.alert('Erreur Google', error.message);
    } finally {
      setLoading(false);
    }
  }

  function validateInputs() {
    if (!email || !password) {
      Alert.alert('Champs requis', 'Veuillez remplir tous les champs');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Email invalide', 'Veuillez entrer un email valide');
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert('Mot de passe trop court', 'Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    
    return true;
  }

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <SafeAreaView style={styles.container} options={{ headerShown: false }}>
     {isLogin? <View style={styles.formContainer}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>
          Connexion
        </Text>
        
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            leftIcon={<Ionicons name="mail-outline" size={24} color="green" />}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
          
          <Input
            placeholder="Mot de passe"
            leftIcon={<Ionicons name="lock-closed-outline" size={24} color="green" />}
            rightIcon={
              <TouchableOpacity onPress={toggleSecureTextEntry}>
                <Ionicons
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="green"
                />
<<<<<<< HEAD
                
                <Text style={styles.title}>
                    Connexion
                </Text>
                
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Email"
                        leftIcon={<Ionicons name="mail-outline" size={24} color="green" />}
                        onChangeText={setEmail}
                        value={email}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        containerStyle={styles.input}
                        inputContainerStyle={styles.inputField}
                    />
                    
                    <Input
                        placeholder="Mot de passe"
                        leftIcon={<Ionicons name="lock-closed-outline" size={24} color="green" />}
                        rightIcon={
                            <TouchableOpacity onPress={toggleSecureTextEntry}>
                                <Ionicons
                                    name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                                    size={24}
                                    color="green"
                                />
                            </TouchableOpacity>
                        }
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={secureTextEntry}
                        autoCapitalize="none"
                        containerStyle={styles.input}
                        inputContainerStyle={styles.inputField}
                    />
                </View>
                
                {isLogin && (
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                )}
                
                <Button
                    title={isLogin ? 'Se connecter' : 'S\'inscrire'}
                    loading={loading}
                    onPress={isLogin ? signInWithEmail : signUpWithEmail}
                    containerStyle={styles.buttonContainer}
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    loadingProps={{ color: 'white' }}
                />
                
                <View style={styles.separatorContainer}>
                    <Divider style={styles.divider} />
                    <Text style={styles.separatorText}>OU</Text>
                    <Divider style={styles.divider} />
                </View>
                
                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.socialButton, styles.facebookButton]}
                        onPress={signInWithFacebook}
                        disabled={loading}
                    >
                        <FontAwesome name="facebook" size={24} color="white" />
                        <Text style={styles.socialButtonText}>Facebook</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.socialButton, styles.googleButton]}
                        onPress={signInWithGoogle}
                        disabled={loading}
                    >
                        <FontAwesome name="google" size={24} color="white" />
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                    style={styles.switchModeContainer}
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text style={styles.switchModeText}>
                        {isLogin ? 'Nouveau ? Créer un compte' : 'Déjà inscrit ? Se connecter'}
                    </Text>
                </TouchableOpacity>
                <Button
                        title='unboard'
                        loading={loading}
                        onPress={() => router.replace('/screens/home/page')}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        loadingProps={{ color: 'white' }}
                    />
            </View>
        ) : (
            <ScrollView>
                <View style={styles.formContainer}>
                    <Image
                        source={require('../assets/images/icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    
                    <Text style={styles.title}>
                        Inscription
                    </Text>
                    
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder="Prenom"
                            leftIcon={<Ionicons name="text-outline" size={24} color="green" />}
                            onChangeText={setPrenom}
                            value={prenom}
                            autoCapitalize="none"
                            keyboardType="default"
                            containerStyle={styles.input}
                            inputContainerStyle={styles.inputField}
                            require
                        />
                        <Input
                            placeholder="Nom"
                            leftIcon={<Ionicons name="text-outline" size={24} color="green" />}
                            onChangeText={setNom}
                            value={nom}
                            autoCapitalize="yes"
                            keyboardType="default"
                            containerStyle={styles.input}
                            inputContainerStyle={styles.inputField}
                        />
                        <Input
                            placeholder="Telephone"
                            leftIcon={<Ionicons name="call-outline" size={24} color="green" />}
                            onChangeText={setTelephone}
                            value={telephone}
                            autoCapitalize="none"
                            keyboardType="phone-pad"
                            containerStyle={styles.input}
                            inputContainerStyle={styles.inputField}
                        />
                        <Input
                            placeholder="Adresse"
                            leftIcon={<Ionicons name="home-outline" size={24} color="green" />}
                            onChangeText={setAdresse}
                            value={adresse}
                            autoCapitalize="none"
                            keyboardType="default"
                            containerStyle={styles.input}
                            inputContainerStyle={styles.inputField}
                        />
                        <Input
                            placeholder="Email"
                            leftIcon={<Ionicons name="mail-outline" size={24} color="green" />}
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            containerStyle={styles.input}
                            inputContainerStyle={styles.inputField}
                        />
                        
                        <Input
                            placeholder="Mot de passe"
                            leftIcon={<Ionicons name="lock-closed-outline" size={24} color="green" />}
                            rightIcon={
                                <TouchableOpacity onPress={toggleSecureTextEntry}>
                                    <Ionicons
                                        name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                                        size={24}
                                        color="green"
                                    />
                                </TouchableOpacity>
                            }
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={secureTextEntry}
                            autoCapitalize="none"
                            containerStyle={styles.input}
                            inputContainerStyle={styles.inputField}
                        />
                    </View>
                    
                    {isLogin && (
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                        </TouchableOpacity>
                    )}
                    
                    <Button
                        title='inscrire'
                        loading={loading}
                        onPress={isLogin ? signInWithEmail : signUpWithEmail}
                        containerStyle={styles.buttonContainer}
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        loadingProps={{ color: 'white' }}
                    />
                    
                    <View style={styles.separatorContainer}>
                        <Divider style={styles.divider} />
                        <Text style={styles.separatorText}>OU</Text>
                        <Divider style={styles.divider} />
                    </View>
                    
                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.socialButton, styles.facebookButton]}
                            onPress={signInWithFacebook}
                            disabled={loading}
                        >
                            <FontAwesome name="facebook" size={24} color="white" />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.socialButton, styles.googleButton]}
                            onPress={signInWithGoogle}
                            disabled={loading}
                        >
                            <FontAwesome name="google" size={24} color="white" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity
                    style={styles.switchModeContainer}
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text style={styles.switchModeText}>
                        {isLogin ? 'Nouveau ? Créer un compte' : 'Déjà inscrit ? Se connecter'}
                    </Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
=======
              </TouchableOpacity>
            }
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
        </View>
        
        {isLogin && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
>>>>>>> 27e7884f37fa46cbbdd57a61203c7862ea7fc056
        )}
        
        <Button
          title={isLogin ? 'Se connecter' : 'S\'inscrire'}
          loading={loading}
          onPress={isLogin ? signInWithEmail : signUpWithEmail}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          loadingProps={{ color: 'white' }}
        />
        
        <View style={styles.separatorContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.separatorText}>OU</Text>
          <Divider style={styles.divider} />
        </View>
        
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={signInWithFacebook}
            disabled={loading}
          >
            <FontAwesome name="facebook" size={24} color="white" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={signInWithGoogle}
            disabled={loading}
          >
            <FontAwesome name="google" size={24} color="white" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.switchModeContainer}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchModeText}>
            {isLogin ? 'Nouveau ? Créer un compte' : 'Déjà inscrit ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </View>:
      <View style={styles.formContainer}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>
          Inscription
        </Text>
        
        <View style={styles.inputContainer}>
        <Input
            placeholder="Prenom"
            leftIcon={<Ionicons name="text-outline" size={24} color="green" />}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="address"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
          <Input
            placeholder="Nom"
            leftIcon={<Ionicons name="text-outline" size={24} color="green" />}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="address"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
             <Input
            placeholder="Telephone"
            leftIcon={<Ionicons name="call-outline" size={24} color="green" />}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="address"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
           <Input
            placeholder="adreese"
            leftIcon={<Ionicons name="home-outline" size={24} color="green" />}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="address"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
          <Input
            placeholder="Email"
            leftIcon={<Ionicons name="mail-outline" size={24} color="green" />}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
          
          <Input
            placeholder="Mot de passe"
            leftIcon={<Ionicons name="lock-closed-outline" size={24} color="green" />}
            rightIcon={
              <TouchableOpacity onPress={toggleSecureTextEntry}>
                <Ionicons
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="green"
                />
              </TouchableOpacity>
            }
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            containerStyle={styles.input}
            inputContainerStyle={styles.inputField}
          />
        </View>
        
        {isLogin && (
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        )}
        
        <Button
          title='inscrire'
          loading={loading}
          onPress={isLogin ? signInWithEmail : signUpWithEmail}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          loadingProps={{ color: 'white' }}
        />
        
        <View style={styles.separatorContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.separatorText}>OU</Text>
          <Divider style={styles.divider} />
        </View>
        
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}
            onPress={signInWithFacebook}
            disabled={loading}
          >
            <FontAwesome name="facebook" size={24} color="white" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={signInWithGoogle}
            disabled={loading}
          >
            <FontAwesome name="google" size={24} color="white" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={styles.switchModeContainer}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchModeText}>
            {isLogin ? 'Nouveau ? Créer un compte' : 'Déjà inscrit ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </View>}
      
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
    
  },
  input: {
    marginBottom: 10,
  },
  inputField: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    paddingHorizontal: 10,
    // borderBottomWidth: 0,
    borderWidth: 1,
    borderColor: 'green',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: 'green',
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  divider: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  separatorText: {
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    width: '48%',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
  },
  googleButton: {
    backgroundColor: '#db4a39',
  },
  socialButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  switchModeContainer: {
    marginTop: 10,
  },
  switchModeText: {
    color: 'green',
    fontSize: 14,
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});