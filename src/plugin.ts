const fs = require('fs');
const { writeFile } = require('fs/promises');
const path = require('path');
const { Buffer } = require('buffer');
const { parseBundle } = require('./parseUtils');


function TaroBundleAnalyzePlugin(options = {}) {
  this.options = options;
};

TaroBundleAnalyzePlugin.prototype.generateReportFile = async function (data) {
  try {
    const { output, fileName = 'report.json', env = 'prod' } = this.options;
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output, { recursive: true });
    }
    const filePath = path.resolve(output, fileName);
    await writeFile(filePath, JSON.stringify(data));
    console.log(`体积报告已生成: ${filePath}`);
  } catch (err) {
    console.log(err);
  }
};

TaroBundleAnalyzePlugin.prototype.analyStats = (stats) => {
  writeFile('test.json', JSON.stringify(stats.assets));
  return stats.assets.map(asset => {
    const type = path.extname(asset.name).slice(1);
    const chunk = asset.chunks[0] ?
      stats.chunks.find(val => val.id === asset.chunks[0]) : null;
    const parsedAssetInfo = type === 'js' ? parseBundle(path.resolve(stats.outputPath, asset.name)) : {};
    const jsModules = [];
    const cssModules = [];
    const chunkModules = chunk ? chunk.modules : [];
    chunkModules.forEach(m => {
      const { id, name } = m;
      const identifier = m.identifier.replace(new RegExp(process.cwd(), 'g'), '.');
      let moduleParsedSize = m.size;
      if (parsedAssetInfo.modules && parsedAssetInfo.modules[id]) {
        const src = parsedAssetInfo.modules[id];
        moduleParsedSize = Buffer.byteLength(src);
      }
      const module = {
        name,
        identifier,
        size: moduleParsedSize,
      };
      // cssModule
      if (/^css/.test(name)) {
        cssModules.push(module);
      } else if (!/(\.(css|scss|less)$)/.test(name)) {
        jsModules.push(module);
      }
    });

    let modules = [];
    if (type === 'js') {
      modules = jsModules;
    } else if (type === 'wxss') {
      modules = cssModules;
    }

    let parsedSize = asset.size;
    if (type === 'js' && parsedAssetInfo.src) {
      parsedSize = Buffer.byteLength(parsedAssetInfo.src);
    }

    return {
      type,
      name: asset.name,
      size: parsedSize,
      modules,
    }
  })
};

TaroBundleAnalyzePlugin.prototype.calcReportData = function (assets) {
  let totalSize = 0;
  let staticSize = 0;
  let chunkSize = 0;
  const subPackageSize = {};
  const assetsSizeInfo = [];
  assets.forEach(asset => {
    const belongPackage =
      (this.appConfig.subPackages || []).find(val => asset.name.includes(val.root)) || { name: "main" };
    const packageName = belongPackage.name || belongPackage.root;

    assetsSizeInfo.push({
      ...asset,
      packageName,
    });

    if (!subPackageSize[packageName]) {
      subPackageSize[packageName] = asset.size;
    } else {
      subPackageSize[packageName] += asset.size;
    }
    if (asset.type === 'js') {
      chunkSize += asset.size;
    } else {
      staticSize += asset.size;
    }
    totalSize += asset.size;

  });

  return {
    version: 1,
    sizeSummaryInfo: {
      // 项目总体积
      totalSize,
      // 项目静态资源总体积
      staticSize,
      // 项目chunk 文件总体积
      chunkSize,
      // 项目各个分包以及主包体积概要
      subPackageSize,
    },
    assetsSizeInfo,
  }
};

TaroBundleAnalyzePlugin.prototype.apply = function (compiler) {
  compiler.hooks.compilation.tap("taro-bundle-analyze", (compilation) => {
    // webpack 5 废弃了 compilation.hooks.normalModuleLoader
    // if (version && version.split(".")[0] >= 5) {
      const normalModule = compiler.webpack.NormalModule;
      normalModule
        .getCompilationHooks(compilation)
        .loader.tap("taro-bundle-analyze", (_loaderContext, module) => {
          module.loaders.forEach((item) => {
            if (item.loader === "@tarojs/taro-loader") {
              // 获取taro app配置
              this.appConfig = item.options.config;
            }
          });
        });
    // }
  });

  compiler.hooks.done.tap('taro-bundle-analyze', stats => {
    const statsJson = stats.toJson();
    if (!this.options.output) {
      this.options.output = statsJson.outputPath;
    }
    const assets = this.analyStats(statsJson);
    const data = this.calcReportData(assets);
    this.generateReportFile(data);
  });
};


export default TaroBundleAnalyzePlugin;
