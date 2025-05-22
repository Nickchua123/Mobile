import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function PaymentWebview({ route }) {
    const { url } = route.params;
    const navigation = useNavigation();

    const handleNavChange = (navState) => {
        const currentUrl = navState.url;

        if (currentUrl.includes('payment-success')) {
            navigation.replace('Success');
        }

        if (currentUrl.includes('payment-cancel') || currentUrl.includes('fail')) {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={handleNavChange}
                startInLoadingState
                renderLoading={() => (
                    <ActivityIndicator size="large" color="#000" style={styles.loader} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loader: { position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] },
});
