// Fungsi bantu untuk format tanggal dd/mm/yyyy
console.log(getBalineseCycle(new Date('1970-06-28')));
// Output: { sapta: 'Redite', panca: 'Paing', wuku: 'Sinta', ... }

console.log(getBalineseCycle(new Date('1970-06-27')));
// Output: { sapta: 'Saniscara', panca: 'Umanis', wuku: 'Watugunung', ... }

console.log(getBalineseCycle(new Date('1970-06-26')));
// Output: { sapta: 'Sukra', panca: 'Kliwon', wuku: 'Dukut', ... }


  return {
    sapta: saptaWara[saptaIdx],
    panca: pancaWara[pancaIdx],
    wuku: wukuList[wukuIdx],
    uripSapta: uripSaptaWara[saptaIdx],
    uripPanca: uripPancaWara[pancaIdx],
    totalUrip: uripSaptaWara[saptaIdx] + uripPancaWara[pancaIdx]
  };
}


  return {
    sapta: saptaWara[saptaIdx],
    panca: pancaWara[pancaIdx],
    wuku: wukuList[wukuIdx],
    uripSapta: uripSaptaWara[saptaIdx],
    uripPanca: uripPancaWara[pancaIdx],
    totalUrip: uripSaptaWara[saptaIdx] + uripPancaWara[pancaIdx]
  };
}

document.getElementById('calculate').addEventListener('click', () => {
  const input = document.getElementById('birthdate').value;
  const inputDate = new Date(input);
  const resultBox = document.getElementById('result');
  const downloadBtn = document.getElementById('download');

  if (isNaN(inputDate.getTime())) {
    resultBox.innerHTML = '<p style="color: orange;">Mohon masukkan tanggal lahir yang valid.</p>';
    downloadBtn.style.display = 'none';
    return;
  }

  const birthCycle = getBalineseCycle(inputDate);
  const currentYear = new Date().getFullYear();
  const start = new Date(`${currentYear}-01-01`);
  const end = new Date(`${currentYear + 3}-12-31`);
  const otonanMatches = [];

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const cycle = getBalineseCycle(d);
    if (
      cycle.sapta === birthCycle.sapta &&
      cycle.panca === birthCycle.panca &&
      cycle.wuku === birthCycle.wuku
    ) {
      otonanMatches.push(new Date(d));
      if (otonanMatches.length >= 6) break;
    }
  }

  let listHTML = '<ul>';
  otonanMatches.forEach((tgl, i) => {
    listHTML += `<li>Otonan ke-${i + 1}: ${formatDate(tgl)}</li>`;
  });
  listHTML += '</ul>';

  resultBox.innerHTML = `
    <div class="pdf-header" style="margin: 0; padding: 0; text-align: center;">
      <h2 style="margin: 0; font-size: 1.4em;">Kalkulator Otonan Bali</h2>
    </div>
    <p><strong>Tanggal Lahir:</strong> <span>${formatDate(inputDate)}</span></p>
	<hr style="margin: 3px 0;" />
    <p><strong>Wuku:</strong> <span>${birthCycle.wuku}</span></p>
    <p><strong>Sapta Wara:</strong> <span>${birthCycle.sapta} (Urip  ${birthCycle.uripSapta})</span></p>
    <p><strong>Panca Wara:</strong> <span>${birthCycle.panca} (Urip  ${birthCycle.uripPanca})</span></p>
    <p><strong>Total Urip:</strong> <span>${birthCycle.totalUrip}</span></p>
    <p><strong>Otonan di Tahun Ini:</strong> <span>${formatDate(otonanMatches[0])}</span></p>
    <p><span>${birthCycle.sapta} - ${birthCycle.panca} Wuku ${birthCycle.wuku}</span></p>
    <p><strong>Jadwal Otonan 3 Tahun:</strong></p>
    ${listHTML}
  `;

  downloadBtn.style.display = 'block';
});

// Tombol PDF tetap sama seperti sebelumnya
document.getElementById('download').addEventListener('click', () => {
  const result = document.getElementById('result');
  if (!result.innerHTML.trim()) {
    alert('Silakan hitung dulu sebelum mengunduh hasil!');
    return;
  }

  const originalStyle = result.getAttribute('style') || '';
  const spans = result.querySelectorAll('span');
  const originalSpanColors = [];

  result.style.backgroundColor = '#ffffff';
  result.style.color = '#000000';
  spans.forEach((span, i) => {
    originalSpanColors[i] = span.style.color;
    span.style.color = '#000000';
  });

  const opt = {
    margin: [0, 0.3, 0.5, 0.3],
    filename: 'hasil-otonan.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  setTimeout(() => {
    html2pdf().set(opt).from(result).save().then(() => {
      result.setAttribute('style', originalStyle);
      spans.forEach((span, i) => {
        span.style.color = originalSpanColors[i] || '';
      });
    });
  }, 300);
});







