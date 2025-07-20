# tscalgochart

Yüksek performanslı, modüler ve genişletilebilir bir finansal grafik (chart) kütüphanesi.  
React + TypeScript + Vite altyapısı ile geliştirilmiştir.

---

## Özellikler

- **Modüler Bileşen Yapısı:** Her grafik ve UI öğesi ayrı dosyada, kolayca genişletilebilir.
- **WebGL/Canvas Performansı:** Büyük veri setlerinde hızlı ve akıcı çizim.
- **D3 ile Güçlü Ölçek/Eksen:** Sadece ölçek ve eksen için D3 kullanılır, çizim WebGL/canvas ile yapılır.
- **Bootstrap ile Responsive UI:** Modern ve esnek arayüz.
- **Statik JSON Veri:** Canlı veri akışı olmadan, büyük veri setleriyle test edilebilir.

---

## Proje Dosya Yapısı

```
tscalgochart/
├── public/
│   └── data/
│       └── sample-data.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ChartCanvas.tsx
│   │   ├── Chart.tsx
│   │   ├── CandleStickSeries.tsx
│   │   ├── LineSeries.tsx
│   │   ├── OHLCSeries.tsx
│   │   ├── BarSeries.tsx
│   │   ├── XAxis.tsx
│   │   ├── YAxis.tsx
│   │   ├── CrossHairCursor.tsx
│   │   ├── MouseCoordinateX.tsx
│   │   ├── MouseCoordinateY.tsx
│   │   ├── OHLCTooltip.tsx
│   │   ├── ZoomButtons.tsx
│   │   └── EdgeIndicator.tsx
│   ├── context/
│   │   └── ChartContext.tsx
│   ├── hooks/
│   │   └── useChartData.ts
│   ├── utils/
│   │   ├── d3Scales.ts
│   │   ├── webglUtils.ts
│   │   └── dataUtils.ts
│   ├── styles/
│   │   └── main.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

Onaylarsan bu içeriği README.md dosyasına ekleyebilirim!

---

## Kurulum

1. **Bağımlılıkları yükle:**
   ```sh
   npm install
   ```

2. **Geliştirme sunucusunu başlat:**
   ```sh
   npm run dev
   ```

3. **Projeyi derle:**
   ```sh
   npm run build
   ```

---

## Kullanım

Ana grafik bileşenini aşağıdaki gibi kullanabilirsiniz:

```tsx
import ChartCanvas from './components/ChartCanvas'
import CandleStickSeries from './components/CandleStickSeries'
// ... diğer bileşenler

function MyChart({ data, width, ratio }) {
  return (
    <ChartCanvas
      height={400}
      width={width}
      ratio={ratio}
      data={data}
      // ... diğer gerekli prop'lar
    >
      {/* Alt grafik ve seriler */}
      <CandleStickSeries />
      {/* ... diğer bileşenler */}
    </ChartCanvas>
  )
}
```

---

## Geliştirme

- Her bileşen kendi dosyasında, kolayca özelleştirilebilir.
- `public/data/sample-data.json` dosyasına büyük veri setleri ekleyerek performans testleri yapabilirsiniz.
- D3 sadece ölçek ve eksen için kullanılır, çizim WebGL/canvas ile yapılır.

---

## Katkı ve Lisans

- Katkı yapmak için PR gönderebilir veya issue açabilirsiniz.
- [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

> Daha fazla bilgi ve örnek için [PROJECT_PLAN.md](PROJECT_PLAN.md) dosyasına göz atabilirsiniz.
