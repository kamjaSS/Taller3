const serieSchema = require('../models/serie.model');
class SeriesService {
  async createSerie(serie) {
    serie.save();
    return serie;
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(serieSchema.find()), 3000);
    });
  }

  /*Consultar el nombre del actor*/
  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId });
  }

  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId });
  }
  async editSerie(
    serieId,
    serie,
    number_seasons,
    number_lenguage,
    original_lenguage,
    features_seasons

  ) {
    return serieSchema.findById({ _id: serieId }).then(() => {
      if (!serieId) throw Error('Serie no encontrada');
      return serieSchema.updateOne(
        { serieId },
        { serie, number_seasons, number_lenguage, original_lenguage, features_seasons }
      );
    });
  }

  async removeSerie(serieId) {
    const serieRemove = serieSchema.findById({ _id: serieId });
    return serieSchema.deleteOne(serieRemove);
  }

  /*obtener serie donde actue un actor especifico*/
  async findActor(name) {
      const data = await serieSchema.find({ "features_seasons.cast": { $in: [name] }});
      if(data.length == 0) return {msg: 'No encontramos coincidencias'}
      return data;
  }

  /*obtener con serie por fecha de estreno*/
  async findByFecha(fecha) {
    const data = await serieSchema.find({ "features_seasons.premier_date": fecha});
    if(data.length == 0) return {msg: 'No encontramos coincidencias'}
    return data;
}
}
module.exports = SeriesService;