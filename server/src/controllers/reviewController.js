import { reviewService } from "../services/reviewService.js";

export const reviewController = {
  async getAll(req, res) {
    try {
      const data = await reviewService.getAll();
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await reviewService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByProductId(req, res) {
    try {
      const data = await reviewService.getByProductId(req.params.producto_id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByUserId(req, res) {
    try {
      const data = await reviewService.getByUserId(req.params.usuario_id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await reviewService.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await reviewService.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await reviewService.delete(req.params.id);
      res.json({ message: "Deleted successfully", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  async getAverageRating(req, res) {
  try {
    const avg = await reviewService.getAverageRatingByProduct(
      req.params.producto_id
    );
    res.json({ promedio: avg });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
,
////

async hasReviewed(req, res) {
  try {
    const { usuario_id, producto_id } = req.params;
    const reviewed = await reviewService.hasUserReviewed(usuario_id, producto_id);
    res.json({ reviewed });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

};
