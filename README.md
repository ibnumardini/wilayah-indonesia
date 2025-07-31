# Wilayah Indonesia Raya

A CLI tool to manage and transform Indonesian administrative data from BPS (Badan Pusat Statistik) API.

## Description

This tool helps you fetch the latest Indonesian administrative division data (provinces, districts, subdistricts, villages, and postal codes) from the official BPS API and transform it into a clean, relational format suitable for applications.

## Features

- 🌏 Fetch complete Indonesian administrative data from BPS API
- 🔄 Transform raw data into structured relational format
- 📁 Organized data structure with both raw and transformed versions
- 🎯 CLI interface with simple commands
- ⚡ Concurrent API requests with rate limiting

## Installation

```bash
npm install -g wilayah-indonesia-raya
```

Or run directly with npx:

```bash
npx wilayah-indonesia-raya
```

## Usage

### Fetch Latest Data

Fetch the latest administrative data from BPS API:

```bash
wilayah-indonesia-raya --fetch
# or
wilayah-indonesia-raya -f
```

### Transform Data

Transform raw data into relational format:

```bash
wilayah-indonesia-raya --transform
# or
wilayah-indonesia-raya -t
```

### Fetch and Transform

You can combine both operations:

```bash
wilayah-indonesia-raya --fetch --transform
```

## Project Structure

```bash
├── data/
│   ├── raw/                    # Raw data from BPS API
│   │   ├── 1-provinces.json
│   │   ├── 2-districts.json
│   │   ├── 3-subdistricts.json
│   │   ├── 4-villages.json
│   │   └── 5-postcodes.json
│   └── transformed/            # Cleaned and structured data
│       ├── 1-provinces.json
│       ├── 2-districts.json
│       ├── 3-subdistricts.json
│       ├── 4-villages.json
│       └── 5-postcodes.json
├── src/
│   ├── index.js               # Main CLI entry point
│   ├── fetch-data.js          # BPS API data fetching
│   ├── transform-data.js      # Data transformation logic
│   └── helper/
│       ├── file.js           # File operations utilities
│       └── string.js         # String manipulation utilities
└── package.json
```

## Data Format

### Raw Data

Raw data maintains the original structure from BPS API with fields like `kode_bps` and `nama_bps`.

### Transformed Data

The transformed data provides a cleaner structure:

**Provinces:**

```json
{
  "code": "11",
  "name": "Aceh"
}
```

**Districts:**

```json
{
  "code": "1101",
  "name": "Simeulue",
  "province_code": "11"
}
```

**Subdistricts:**

```json
{
  "code": "1101010",
  "name": "Teupah Selatan",
  "district_code": "1101"
}
```

**Villages:**

```json
{
  "code": "1101010001",
  "name": "Latiung",
  "subdistrict_code": "1101010"
}
```

**Postal Codes:**

```json
{
  "code": "23891",
  "name": "Latiung",
  "village_code": "1101010001"
}
```

## Development

### Prerequisites

- Node.js (version 14 or higher)
- pnpm (recommended) or npm

### Setup

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd wilayah-indonesia-raya
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Run development commands:

    ```bash
    # Fetch data only
    pnpm run fetch-data

    # Transform data only
    pnpm run transform-data
    ```

## Dependencies

- **commander**: CLI framework for building command-line tools
- **p-limit**: Concurrency control for API requests

## Data Source

This tool fetches data from the official Indonesian Bureau of Statistics (BPS) API, ensuring you get the most up-to-date administrative division information.

## License

Apache-2.0

## Author

Muhammad Fatkurozi <fatkurozy.muhammad28@gmail.com>

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
