# Student Risk DSS — Tasarım Fikirleri

## Yaklaşım 1: Akademik Otorite (Seçilen)

<response>
<idea>
**Design Movement:** Neo-Institutional / Data-Forward Dashboard

**Core Principles:**
1. Bilgi hiyerarşisi her şeyin önünde — kritik risk verileri görsel ağırlık taşır
2. Monospace + Serif kombinasyonu: sayısal veriler için JetBrains Mono, başlıklar için Playfair Display
3. Koyu lacivert/slate zemin üzerine amber/turuncu uyarı renkleri — otoriter ama soğuk değil
4. Sol kenar çubuğu navigasyon + geniş içerik alanı asimetrik düzeni

**Color Philosophy:**
- Ana arka plan: #0F1629 (derin lacivert) — güven ve otorite
- Kart yüzeyi: #1A2340 (hafif aydınlık lacivert)
- Birincil vurgu: #3B82F6 (mavi) — nötr bilgi
- Uyarı: #F59E0B (amber) — orta risk
- Tehlike: #EF4444 (kırmızı) — yüksek risk
- Başarı: #10B981 (yeşil) — düşük risk / mezuniyet
- Monospace sayılar: parlak beyaz (#F8FAFC) — hızlı tarama

**Layout Paradigm:**
- Sol sabit kenar çubuğu (240px) + sağ içerik alanı
- Üst kısımda özet istatistik kartları (KPI row)
- Alt kısımda filtreli öğrenci kartları grid'i
- Kart tıklandığında sağdan kayan detay paneli (slide-over)

**Signature Elements:**
1. Risk göstergesi: Dairesel progress bar + büyük yüzde sayısı
2. Renk kodlu sol kenar çizgisi her öğrenci kartında (kırmızı/amber/yeşil)
3. Veri tabloları için tam genişlik monospace font

**Interaction Philosophy:**
- Hover'da kart hafifçe yükselir (translateY -2px)
- Filtreler anlık sonuç günceller (debounced)
- Detay paneli smooth slide-in animasyonu
- Risk skoru sayıcı animasyonu (count-up)

**Animation:**
- Kart girişleri: staggered fade-in-up (50ms arayla)
- Risk çubuğu: 800ms ease-out dolma animasyonu
- Modal: 300ms slide-from-right
- Hover: 150ms ease transition

**Typography System:**
- H1 (Dashboard başlığı): Playfair Display Bold 28px
- H2 (Bölüm başlıkları): Playfair Display SemiBold 20px
- Body: Inter Regular 14px
- Sayısal veriler: JetBrains Mono 14px
- Caption/etiket: Inter Medium 11px uppercase letter-spacing
- Risk yüzdesi: JetBrains Mono Bold 32px
</idea>
<text>Neo-Institutional Data-Forward Dashboard</text>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement:** Clinical Minimalism

**Core Principles:**
1. Beyaz zemin, ince çizgiler, maksimum veri yoğunluğu
2. Tablo odaklı görünüm, kart değil
3. Sadece işlevsel renkler, dekoratif yok

**Color Philosophy:** Beyaz + gri + kırmızı/yeşil semantik renkler

**Layout Paradigm:** Üst filtre çubuğu + tam genişlik veri tablosu

**Signature Elements:** Sıkı tablo satırları, inline sparkline grafikler

**Interaction Philosophy:** Satır seçimi, çoklu seçim, toplu işlem

**Animation:** Minimal, sadece sort/filter geçişleri

**Typography System:** IBM Plex Sans + IBM Plex Mono
</idea>
<text>Clinical Minimalism</text>
<probability>0.06</probability>
</response>

<response>
<idea>
**Design Movement:** Warm Academic

**Core Principles:**
1. Krem/bej zemin, ahşap tonları
2. Serif ağırlıklı tipografi
3. Öğrenci odaklı, cezalandırıcı değil

**Color Philosophy:** #FAF7F2 zemin, #8B5E3C kahverengi vurgu, yeşil/turuncu semantik

**Layout Paradigm:** Kart grid, geniş boşluklar, yumuşak gölgeler

**Signature Elements:** Fotoğraf avatarlar, el yazısı benzeri etiketler

**Interaction Philosophy:** Sürükle-bırak önceliklendirme

**Animation:** Yavaş, yumuşak geçişler

**Typography System:** Lora + Source Sans Pro
</idea>
<text>Warm Academic</text>
<probability>0.05</probability>
</response>
