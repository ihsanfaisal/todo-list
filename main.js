import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';

import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    query,
    orderBy
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
    authDomain: "insan-cemerlang.firebaseapp.com",
    projectId: "insan-cemerlang",
    storageBucket: "insan-cemerlang.appspot.com",
    messagingSenderId: "579109661574",
    appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig);
const basisdata = getFirestore(aplikasi);

// fungsi untuk menampilkan daftar todo list
export async function ambilDaftarTodo() {
    try {
        const refDokumen = collection(basisdata, "todo");
        const kueri = query(refDokumen, orderBy("teks"));
        const cuplikanKueri = await getDocs(kueri);

        let hasilKueri = [];
        cuplikanKueri.forEach((dokumen) => {
            hasilKueri.push({
                id: dokumen.id,
                teks: dokumen.data().teks,
                status: dokumen.data().status
            });
        });

        return hasilKueri;
    } catch (error) {
        console.error("Gagal mengambil daftar to-do:", error);
        return [];
    }
}

// fungsi untuk menambah todo list
export async function tambahTodoList(teks, status) {
  try {
    // Menyimpan data todo ke Firestore dengan field teks dan status sesuai parameter
    const refDokumen = await addDoc(collection(basisdata, "todo"), {
      teks: teks,
      status: status // nilai status misalnya "belum", "proses", "selesai"
    });

    // Menampilkan pesan berhasil dan mengembalikan data yang telah disimpan
    console.log("berhasil menyimpan data todo");
    return {
      id: refDokumen.id,
      teks: teks,
      status: status
    };
  } catch (error) {
    // Menampilkan pesan gagal jika terjadi error
    console.log("gagal menyimpan data todo");
    return null;
  }
}
