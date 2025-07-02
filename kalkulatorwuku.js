document.getElementById('calculate').addEventListener('click', function () {
  const inputDate = new Date(document.getElementById('birthdate').value);
  if (isNaN(inputDate.getTime())) {
    document.getElementById('result').innerHTML = '<p style="color: orange;">Mohon masukkan tanggal lahir yang valid.</p>';
    return;
  }

  const refDate = new Date('1970-06-28'); // Wuku Sinta, Redite, Paing
  const diffTime = inputDate.getTime() - refDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const saptaIndex = diffDays % 7;
  const pancaIndex = diffDays % 5;
  const wukuIndex = Math.floor(diffDays / 7) % 30;

  const saptaWara = ['Redite', 'Soma', 'Anggara', 'Buda', 'Wraspati', 'Sukra', 'Saniscara'];
  const pancaWara = ['Paing', 'Pon', 'Wage', 'Kliwon', 'Umanis'];
  const wukuList = [
    'Sinta', 'Landep', 'Ukir', 'Kulantir', 'Tolu', 'Gumbreg',
    'Wariga', 'Warigadian', 'Julungwangi', 'Sungsang', 'Dunggulan',
    'Kuningan', 'Langkir', 'Medangsia', 'Pujut', 'Pahang', 'Krulut',
    'Merakih', 'Tambir', 'Medangkungan', 'Matal', 'Uye', 'Menail',
    'Prangbakat', 'Bala', 'Ugu', 'Wayang', 'Kelawu', 'Dukut', 'Watugunung'
  ];

  const uripSaptaWara = [5, 4, 3, 7, 8, 6, 9];
  const uripPancaWara = [9, 7, 4, 8, 5];

  const sapta = saptaWara[saptaIndex];
  const panca = pancaWara[pancaIndex];
  const wuku = wukuList[wukuIndex];
  const uripSapta = uripSaptaWara[saptaIndex];
  const uripPanca = uripPancaWara[pancaIndex];
  const totalUrip = uripSapta + uripPanca;

  // Hitung otonan pertama
  const otonan1 = new Date(inputDate.getTime() + 210 * 24 * 60 * 60 * 1000);
  const formatDate = (d) => {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  const formattedOtonan1 = formatDate(otonan1);

  // Hitung 6 otonan ke depan (~3 tahun)
  const jadwalOtonan = [];
  for (let i = 1; i <= 6; i++) {
    const next = new Date(inputDate.getTime() + i * 210 * 24 * 60 * 60 * 1000);
    jadwalOtonan.push(formatDate(next));
  }

  let listHTML = '<ul>';
  jadwalOtonan.forEach((tgl, i) => {
    listHTML += `<li>Otonan ke-${i + 1}: ${tgl}</li>`;
  });
  listHTML += '</ul>';

  // Output ke HTML
  document.getElementById('result').innerHTML = `
    <p><strong>Wuku:</strong> <span>${wuku}</span></p>
    <p><strong>Sapta Wara:</strong> <span>${sapta}</span> (Urip: ${uripSapta})</p>
    <p><strong>Panca Wara:</strong> <span>${panca}</span> (Urip: ${uripPanca})</p>
    <p><strong>Total Urip:</strong> <span>${totalUrip}</span></p>
    <p><strong>Tanggal Otonan Berikutnya:</strong> <span>${formattedOtonan1}</span></p>
    <p><strong>Jadwal Otonan 3 Tahun:</strong></p>
    ${listHTML}
  `;
});
