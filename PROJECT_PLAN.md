# tscalgochart

Yüksek performanslı, modüler ve genişletilebilir bir finansal grafik (chart) kütüphanesi.  
React + TypeScript + Vite altyapısı ile geliştirilmiştir.

---

## Özellikler

- **Modüler Bileşen Yapısı:** Her grafik ve UI öğesi ayrı dosyada, kolayca genişletilebilir.
- **Context API ile State Yönetimi:** Global state yönetimi için React Context API kullanılır.
- **D3 ile Güçlü Ölçek/Eksen:** Sadece ölçek ve eksen için D3 kullanılır, çizim SVG ile yapılır.
- **TypeScript ile Tip Güvenliği:** Tüm bileşenler ve veri yapıları tip güvenli.
- **Parallel JSON Veri Desteği:** OHLC verilerini parallel JSON formatından normalize eder.
- **Discontinuous Time Scale:** Finansal grafikler için uygun zaman ölçeği.

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
│   │   ├── ChartCanvas.tsx          ✅ Tamamlandı
│   │   ├── Chart.tsx                ✅ Tamamlandı
│   │   ├── CandleStickSeries.tsx    ✅ Tamamlandı
│   │   ├── XAxis.tsx                ✅ Tamamlandı
│   │   ├── YAxis.tsx                ✅ Tamamlandı
│   │   ├── LineSeries.tsx           🔄 Planlandı
│   │   ├── OHLCSeries.tsx           🔄 Planlandı
│   │   ├── BarSeries.tsx            🔄 Planlandı
│   │   ├── CrossHairCursor.tsx      🔄 Planlandı
│   │   ├── MouseCoordinateX.tsx     🔄 Planlandı
│   │   ├── MouseCoordinateY.tsx     🔄 Planlandı
│   │   ├── OHLCTooltip.tsx          🔄 Planlandı
│   │   ├── ZoomButtons.tsx          🔄 Planlandı
│   │   └── EdgeIndicator.tsx        🔄 Planlandı
│   ├── context/
│   │   └── ChartContext.tsx         ✅ Tamamlandı
│   ├── hooks/
│   │   └── useChartData.ts          ✅ Tamamlandı
│   ├── utils/
│   │   ├── index.ts                 ✅ Tamamlandı
│   │   ├── discontinuousTimeScaleProvider.ts ✅ Tamamlandı
│   │   ├── d3Scales.ts              🔄 Planlandı
│   │   ├── webglUtils.ts            🔄 Planlandı
│   │   └── dataUtils.ts             🔄 Planlandı
│   ├── styles/
│   │   └── main.css                 🔄 Planlandı
│   ├── App.tsx                      ✅ Tamamlandı
│   ├── main.tsx                     ✅ Tamamlandı
│   └── vite-env.d.ts                ✅ Tamamlandı
├── package.json                     ✅ Tamamlandı
├── tsconfig.json                    ✅ Tamamlandı
├── vite.config.ts                   ✅ Tamamlandı
└── README.md                        ✅ Tamamlandı
```

**Açıklama:**
- ✅ Tamamlandı: Bileşen tamamen çalışır durumda
- 🔄 Planlandı: Gelecek aşamalarda geliştirilecek

---

## Mevcut Durum

### ✅ Tamamlanan Bileşenler

1. **ChartContext.tsx**
   - Global state yönetimi
   - useChartData hook entegrasyonu
   - ScaleProvider sağlama

2. **useChartData.ts**
   - Parallel JSON veri yükleme
   - OHLC veri normalizasyonu
   - Loading state yönetimi

3. **discontinuousTimeScaleProvider.ts**
   - Finansal grafikler için zaman ölçeği
   - D3-scale entegrasyonu
   - Helper fonksiyonlar (slidingWindow, zipper, vb.)

4. **ChartCanvas.tsx**
   - SVG container bileşeni
   - Context tüketimi
   - Responsive tasarım

5. **Chart.tsx**
   - Ana chart bileşeni
   - YScale oluşturma
   - Context sağlama

6. **CandleStickSeries.tsx**
   - Mum grafik çizimi
   - YAxis ile uyumlu ölçekleme
   - Renk kodlaması (yeşil/kırmızı)

7. **XAxis.tsx**
   - X ekseni çizimi
   - Tick pozisyonları
   - Veri indeksleri

8. **YAxis.tsx**
   - Y ekseni çizimi (sağ tarafta)
   - Fiyat değerleri
   - OHLC veri aralığına göre ölçekleme

9. **utils/index.ts**
   - Helper fonksiyonlar
   - slidingWindow, zipper, identity
   - isNotDefined, getClosestItemIndexes

### 🔄 Gelecek Aşamalar

1. **WebGL Entegrasyonu**
   - pixi.js veya regl kullanımı
   - Büyük veri setleri için performans optimizasyonu

2. **Ek Bileşenler**
   - LineSeries, BarSeries, OHLCSeries
   - CrossHairCursor, Tooltip bileşenleri
   - Zoom ve Pan fonksiyonları

3. **Gelişmiş Özellikler**
   - Çoklu zaman dilimi desteği
   - Teknik indikatörler
   - Çizim araçları

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
import { ChartProvider } from './context/ChartContext'
import ChartCanvas from './components/ChartCanvas'
import Chart from './components/Chart'
import CandleStickSeries from './components/CandleStickSeries'
import XAxis from './components/XAxis'
import YAxis from './components/YAxis'

function MyChart() {
  return (
    <ChartProvider>
      <ChartCanvas height={400} width={800}>
        <Chart id={1} yExtents={(d) => [d.low, d.high]} height={400}>
          <CandleStickSeries />
          <XAxis />
          <YAxis width={800} />
        </Chart>
      </ChartCanvas>
    </ChartProvider>
  )
}
```

### Veri Formatı

Parallel JSON formatı desteklenir:

```json
{
  "time": [1640995200000, 1641081600000, ...],
  "open": [28.50, 28.75, ...],
  "high": [28.80, 28.90, ...],
  "low": [28.45, 28.70, ...],
  "close": [28.75, 28.85, ...]
}
```

---

## Teknik Detaylar

### Context API Yapısı
- **ChartContext**: Global state yönetimi
- **useChartData**: Veri yükleme ve normalizasyon
- **ScaleProvider**: D3 ölçekleri sağlama

### Ölçekleme Sistemi
- **discontinuousTimeScaleProvider**: Finansal grafikler için zaman ölçeği
- **YScale**: OHLC veri aralığına göre dinamik ölçekleme
- **XScale**: Veri indekslerine göre pozisyon hesaplama

### Bileşen Mimarisi
- **Modüler Yapı**: Her bileşen bağımsız ve yeniden kullanılabilir
- **Context Tüketimi**: Prop drilling olmadan veri paylaşımı
- **TypeScript**: Tam tip güvenliği

---

## Geliştirme

- Her bileşen kendi dosyasında, kolayca özelleştirilebilir.
- `public/data/sample-data.json` dosyasına büyük veri setleri ekleyerek performans testleri yapabilirsiniz.
- D3 sadece ölçek ve eksen için kullanılır, çizim SVG ile yapılır.

---

## Katkı ve Lisans

- Katkı yapmak için PR gönderebilir veya issue açabilirsiniz.
- [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

> Daha fazla bilgi ve örnek için [PROJECT_PLAN.md](PROJECT_PLAN.md) dosyasına göz atabilirsiniz.
