export function formatSupabaseError(error, fallbackMessage) {
  if (!error) {
    return fallbackMessage;
  }

  const details = [];

  if (error.message && typeof error.message === 'string') {
    details.push(error.message.trim());
  }

  if (error.details && typeof error.details === 'string') {
    details.push(error.details.trim());
  }

  if (error.hint && typeof error.hint === 'string') {
    details.push(error.hint.trim());
  }

  if (error.cause && error.cause instanceof Error && error.cause.message) {
    details.push(error.cause.message.trim());
  }

  const uniqueDetails = [...new Set(details.filter(Boolean))];
  const detailMessage = uniqueDetails.length > 0 ? `Details: ${uniqueDetails.join(' | ')}` : '';
  const codeMessage = error.code ? `Code: ${error.code}` : '';

  return [fallbackMessage, detailMessage, codeMessage].filter(Boolean).join(' ');
}

