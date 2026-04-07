import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FAB, Portal, Dialog, Button, Text, Card, Appbar, ProgressBar, Avatar } from 'react-native-paper';
import ChatView from "./ChatView";

export default function App() {
    const [visible, setVisible] = useState(false);
    const [orderCount, setOrderCount] = useState(0);

    const handleConfirmOrder = () => {
        if (orderCount === 9) {
            alert("Congrats! Your 10th order was FREE! 🍕🎁");
            setOrderCount(0);
        } else {
            setOrderCount(prev => prev + 1);
        }
        setVisible(false);
    };

    const progress = orderCount / 10;

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Quick Bites Loyalty" titleStyle={styles.headerTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* LOYALTY CARD */}
                <Card style={styles.loyaltyCard}>
                    <Card.Title 
                        title="Loyalty Points" 
                        subtitle={orderCount === 9 ? "NEXT ORDER IS FREE!" : `${10 - orderCount} orders to go!`}
                        left={(props) => <Avatar.Icon {...props} icon="star" color="#fff" style={{backgroundColor: '#FFD700'}} />}
                    />
                    <Card.Content>
                        <ProgressBar progress={progress} color={'#FF5722'} style={styles.bar} />
                        <Text style={styles.statusText}>{orderCount} / 10 Orders Completed</Text>
                    </Card.Content>
                </Card>

                {/* FOOD MENU SECTION (This brings back the design) */}
                <Text style={styles.sectionTitle}>Featured Menu</Text>
                <View style={styles.grid}>
                    <Card style={styles.menuCard}>
                        <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' }} />
                        <Card.Title title="Hand-tossed Pizza" />
                    </Card>
                    <Card style={styles.menuCard}>
                        <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd' }} />
                        <Card.Title title="Classic Burger" />
                    </Card>
                </View>
            </ScrollView>

            <Portal>
                <Dialog visible={visible} onDismiss={() => setVisible(false)} style={styles.dialog}>
                    <Dialog.Title>
                        {orderCount === 9 ? "🎁 YOUR FREE ORDER" : "Order Assistant"}
                    </Dialog.Title>
                    <Dialog.Content>
                        <ChatView /> 
                        {orderCount === 9 && (
                            <Text style={styles.freeText}>Loyalty Reward Applied: $0.00 Total</Text>
                        )}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                        <Button mode="contained" onPress={handleConfirmOrder} style={{backgroundColor: '#FF5722'}}>
                            {orderCount === 9 ? "Claim Free Meal" : "Confirm Order"}
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <FAB
                style={styles.fab}
                icon="chat"
                label={orderCount === 9 ? "CLAIM FREE MEAL" : "Start Order"}
                onPress={() => setVisible(true)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#FFF5F2', // Re-added the warm peach background
        minHeight: '100vh' 
    },
    header: { backgroundColor: '#FF5722' },
    headerTitle: { color: '#fff', fontWeight: 'bold' },
    scrollContent: { padding: 16 },
    loyaltyCard: { marginBottom: 20, backgroundColor: '#fff', elevation: 4 },
    bar: { height: 12, borderRadius: 6, marginTop: 10 },
    statusText: { marginTop: 10, fontWeight: 'bold', textAlign: 'center', color: '#666' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    grid: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        flexWrap: 'wrap' // Ensures they stay side-by-side
    },
    menuCard: { width: '48%', marginBottom: 15 },
    fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#FF5722' },
    freeText: { color: 'green', fontWeight: 'bold', marginTop: 15, textAlign: 'center', fontSize: 16 },
    dialog: { backgroundColor: '#fff' }
});