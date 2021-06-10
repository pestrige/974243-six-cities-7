const adaptOfferToClient = (offer) => {
  const { host } = offer;

  const adaptedOffer =  {
    ...offer,
    host: {
      id: host.id,
      name: host.name,
      avatarUrl: host.avatar_url,
      isPro: host.is_pro,
    },
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    maxAdult: offer.max_adults,
    previewImage: offer.preview_image,
  };

  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptOffersToClient = (data) => Array.isArray(data)
  ? data.map((offer) => adaptOfferToClient(offer))
  : adaptOfferToClient(data);

const adaptReviewToClient = (review) => {
  const adaptedReview = {
    ...review,
    user: {
      id: review.user.id,
      isPro: review.user.is_pro,
      name: review.user.name,
      avatarUrl: review.user.avatar_url,
    },
    date: new Date(review.date),
  };

  return adaptedReview;
};

export const adaptReviewsToClient = (data) => Array.isArray(data)
  ? data.map((review) => adaptReviewToClient(review))
  : adaptReviewToClient(data);


