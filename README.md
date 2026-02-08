Ldiax

# VeinMining - Minecraft Add-On

A powerful Minecraft Bedrock Edition add-on that implements **Vein Mining** functionality, allowing players to break entire ore veins with a single click.

## 🎮 Features

- **Vein Mining**: Break entire connected ore veins by mining just one block
- **Multi-Ore Support**: Works with all vanilla ores including:
  - Coal, Iron, Copper, Gold, Redstone, Emerald, Lapis, Diamond
  - Deepslate variants
  - Nether Gold and Nether Quartz
  - Ancient Debris
- **Configurable**: Easily adjust max blocks per vein and search distance
- **Performance Optimized**: Efficient pathfinding algorithm to prevent lag
- **Minecraft 1.21.130+**: Built for latest Bedrock Edition

## 📋 Requirements

- Minecraft Bedrock Edition 1.21.130 or higher
- TypeScript 5.0+ (for development)
- Node.js and npm (for building)

## 🚀 Installation

### For Players

1. Download the latest release of the VeinMining add-on
2. Move the `.mcaddon` file to your Minecraft add-ons folder
3. Enable the add-on in your world settings
4. Start mining and enjoy!

### For Developers

1. Clone this repository:
```bash
cd VeinMining
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Deploy locally:
```bash
npm run local-deploy
```

## 🔧 Configuration

Edit the `CONFIG` object in `scripts/main.ts` to customize the vein mining behavior:

```typescript
const CONFIG = {
  maxBlocks: 64,        // Maximum blocks that can be broken per vein
  maxDistance: 10,      // Maximum distance to search for connected blocks
  enabled: true         // Enable/disable vein mining
};
```

## 📁 Project Structure

```
VeinMining/
├── behavior_packs/         # Behavior pack files
│   └── mc_myad/
│       ├── manifest.json   # Pack manifest
│       └── ...
├── resource_packs/         # Resource pack files
│   └── mc_myad/
│       ├── manifest.json   # Pack manifest
│       └── ...
├── scripts/
│   ├── main.ts            # TypeScript source code
│   └── main.js            # Compiled JavaScript
├── lib/                    # Build artifacts
├── package.json            # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── eslint.config.mjs      # ESLint configuration
```

## 📦 Available Scripts

- `npm run build` - Build the project and generate the add-on
- `npm run lint` - Run ESLint to check code quality
- `npm run clean` - Clean build artifacts
- `npm run local-deploy` - Deploy the add-on to your local Minecraft installation
- `npm run mcaddon` - Create a .mcaddon package file
- `npm run enablemcloopback` - Enable Minecraft loopback exemption (Windows)
- `npm run enablemcpreviewloopback` - Enable Preview loopback exemption (Windows)

## 🎯 How It Works

The vein mining system:

1. **Detects Block Break**: Listens for ore block breaks
2. **Identifies Vein**: Uses a breadth-first search to find all connected ore blocks
3. **Applies Limits**: Respects maxBlocks and maxDistance constraints
4. **Breaks Blocks**: Destroys all connected blocks in the vein
5. **Drops Items**: All drops are collected by the player

## 🐛 Troubleshooting

### Add-on not appearing in Minecraft
- Ensure Minecraft version is 1.21.130 or higher
- Try rebuilding: `npm run build`
- Re-deploy: `npm run local-deploy`

### Vein mining not working
- Check that the add-on is enabled in world settings
- Verify `CONFIG.enabled` is set to `true` in `main.ts`
- Try mining a diamond ore - it's easier to test with

### Build errors
- Clear cache: `npm run clean`
- Reinstall dependencies: `npm install`
- Run: `npm run build`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request with any improvements.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with the official Minecraft Scripting API
- Inspired by the popular Fabric vein mining mods

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Enjoy efficient mining with VeinMining! ⛏️**

Ldiax
