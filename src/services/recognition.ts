import { buildMockRecognized } from '@/mock/ingredients';
import type { RecognitionResult, RecognizedIngredient } from '@/types';

/** 模拟网络/模型耗时 */
const RECOGNIZE_DELAY_MS = 2200;

/**
 * 识别单张照片里的食材（Mock）
 *
 * 真实接入时，把这里替换为：
 *   const res = await fetch('/api/vision/ingredients', { method: 'POST', body: formData })
 *   return res.json()
 * 只要返回结构仍为 RecognitionResult，上层页面无需改动。
 */
export function recognizeIngredients(imageSeed: number): Promise<RecognitionResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `rec_${Date.now()}`,
        createdAt: Date.now(),
        imageSeeds: [imageSeed],
        items: buildMockRecognized(),
      });
    }, RECOGNIZE_DELAY_MS);
  });
}

/** 合并多张照片的识别结果：去重并保留最高置信度，默认全部选中 */
export function mergeRecognitions(results: RecognitionResult[]): RecognitionResult {
  const map = new Map<string, RecognizedIngredient>();
  results.forEach((result) => {
    result.items.forEach((item) => {
      const existing = map.get(item.id);
      if (!existing || item.confidence > existing.confidence) {
        map.set(item.id, { ...item, selected: true });
      }
    });
  });
  const seeds = Array.from(new Set(results.flatMap((r) => r.imageSeeds)));
  return {
    id: `rec_merge_${Date.now()}`,
    createdAt: Date.now(),
    imageSeeds: seeds,
    items: Array.from(map.values()).sort((a, b) => b.confidence - a.confidence),
  };
}
