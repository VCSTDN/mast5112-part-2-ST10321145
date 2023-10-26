import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const [averagePagesPerBook, setAveragePagesPerBook] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    pages: 0,
  });

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Biography'];

  const addBook = () => {
    const { title, author, genre, pages } = newBook;
    if (title && author && genre && pages > 0) {
      const newTotalPagesRead = totalPagesRead + pages;
      const newBooks = [{ title, author, genre, pages }, ...books];

      setTotalPagesRead(newTotalPagesRead);
      setBooks(newBooks);

      
      const newAveragePagesPerBook = newTotalPagesRead / newBooks.length;
      setAveragePagesPerBook(newAveragePagesPerBook);

     
      setNewBook({
        title: '',
        author: '',
        genre: 'Fiction',
        pages: 0,
      });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>BookWorm App </Text>
      </View>

      <View style={styles.lastBookContainer}>
        <Text style={styles.sectionTitle}>Previous Book Read </Text>
        {books.length > 0 ? (
          <FlatList
            data={[books[0]]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.bookDetail}>Title: {item.title}</Text>
                <Text style={styles.bookDetail}>Author: {item.author}</Text>
                <Text style={styles.bookDetail}>Genre: {item.genre}</Text>
                <Text style={styles.bookDetail}>Pages: {item.pages}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No books recorded</Text>
        )}
      </View>

      <View style={styles.statisticsContainer}>
        <Text style={styles.sectionTitle}>Stats</Text>
        <Text style={styles.statDetail}>Total Pages Read: {totalPagesRead}</Text>
        <Text style={styles.statDetail}>Average Pages read per Book: {averagePagesPerBook.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>

      {}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add New Book</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={newBook.author}
            onChangeText={(text) => setNewBook({ ...newBook, author: text })}
          />
          <View style={styles.dropdownContainer}>
            {genres.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.dropdownButton,
                  newBook.genre === genre ? { backgroundColor: '#aefcf1' } : null,
                ]}
                onPress={() => setNewBook({ ...newBook, genre: genre })}
              >
                <Text
                  style={[
                    styles.dropdownButtonText,
                    newBook.genre === genre ? { color: '#000000' } : null,
                  ]}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Number of Pages"
            value={newBook.pages.toString()}
            onChangeText={(text) => setNewBook({ ...newBook, pages: parseInt(text) || 0 })}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.addBookButton} onPress={addBook}>
            <Text style={styles.addBookButtonText}>Add Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'top',
    padding: 70,
    backgroundColor: '#7e05f7',
  },
  modalHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginBottom: 100,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 0,
  },
  addBookButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addBookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cancelButton: {
    backgroundColor: '#FF5722',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F2F2',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  lastBookContainer: {
    marginBottom: 100,
    backgroundColor: '#a995ab',
    borderRadius: 10,
    padding: 15,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bookDetail: {
    fontSize: 22,
    color: '#555',
  },
  statisticsContainer: {
    marginBottom: 200,
    backgroundColor: '#a995ab',
    borderRadius: 10,
    padding: 60,
    elevation: 2,
    shadowColor: '#FFF',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  statDetail: {
    fontSize: 20,
    color: '#555',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#a995ab',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default HomePage;