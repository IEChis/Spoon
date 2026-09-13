import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { useAppStore } from '@/store/AppStore';
import styles from './CameraPage.module.css';

export default function CameraPage() {
  const navigate = useNavigate();
  const { startRecognition } = useAppStore();
  const [shooting, setShooting] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [captured, setCaptured] = useState<number[]>([]);
  const [previewing, setPreviewing] = useState(false);
  const timerRef = useRef<number | null>(null);
  const previewTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (previewTimerRef.current) window.clearTimeout(previewTimerRef.current);
    },
    [],
  );

  const goBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/', { replace: true });
  };

  const takeShot = () => {
    if (shooting || previewing) return;
    const seed = Math.floor(Math.random() * 10000);
    setShooting(true);
    timerRef.current = window.setTimeout(() => {
      setShooting(false);
      setCaptured((prev) => [...prev, seed]);
      setPreviewing(true);
    }, 360);
  };

  const handleContinue = () => {
    setPreviewing(false);
  };

  const handleFinish = () => {
    const seeds = captured;
    if (seeds.length === 0) return;
    startRecognition(seeds);
    navigate('/recognition', { replace: false });
  };

  /** 模拟从相册选择：随机加入一张照片种子 */
  const handleGallery = () => {
    if (shooting || previewing) return;
    const seed = Math.floor(Math.random() * 10000);
    setCaptured((prev) => [...prev, seed]);
    setPreviewing(true);
  };

  const hasPhoto = captured.length > 0;

  return (
    <div className={styles.camera}>
      {/* 取景画面（Mock）：干净的浅色取景区，不放置插画 */}
      <div className={styles.scene} aria-hidden="true" />

      {/* 顶部标题栏 */}
      <div className={styles.top}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={goBack}
          aria-label="关闭相机"
        >
          <Icon name="close" size={20} />
        </button>
        <span className={styles.title}>发现食材</span>
        <button
          type="button"
          className={`${styles.iconBtn} ${flashOn ? styles.flashOn : ''}`}
          onClick={() => setFlashOn((v) => !v)}
          aria-label={flashOn ? '关闭闪光灯' : '打开闪光灯'}
          aria-pressed={flashOn}
        >
          <Icon name="flash" size={19} />
        </button>
      </div>

      {/* 中央取景框 */}
      <div className={styles.frameWrap}>
        <div className={styles.frame}>
          <span className={`${styles.corner} ${styles.tl}`} />
          <span className={`${styles.corner} ${styles.tr}`} />
          <span className={`${styles.corner} ${styles.bl}`} />
          <span className={`${styles.corner} ${styles.br}`} />
          <span className={styles.scanline} />
        </div>
        <p className={styles.hint}>把食材放进画框里，拍不全可以分多次拍</p>
      </div>

      {/* 底部：相册 / 快门 / 已拍张数 */}
      <div className={styles.bottom}>
        <button
          type="button"
          className={styles.sideBtn}
          onClick={handleGallery}
          aria-label="从相册选择"
        >
          <Icon name="image" size={20} />
        </button>

        <button
          type="button"
          className={styles.shutter}
          onClick={takeShot}
          aria-label="拍照"
        >
          <span className={styles.shutterInner} />
        </button>

        <button
          type="button"
          className={`${styles.sideBtn} ${styles.reviewBtn}`}
          onClick={() => captured.length > 0 && setPreviewing(true)}
          aria-label="查看已拍照片"
          disabled={!hasPhoto}
        >
          {hasPhoto ? (
            <span className={styles.countBadge}>{captured.length}</span>
          ) : (
            <Icon name="image" size={20} />
          )}
        </button>
      </div>

      {/* 已拍胶片条：当拍了至少一张时显示缩略与完成入口 */}
      {hasPhoto && !previewing && (
        <div className={styles.filmStrip}>
          <div className={styles.filmThumbs} aria-hidden="true">
            {captured.slice(-4).map((seed) => (
              <span key={seed} className={styles.filmThumb}>
                <span className={styles.filmStill} />
              </span>
            ))}
          </div>
          <button
            type="button"
            className={styles.doneBtn}
            onClick={handleFinish}
            aria-label={`识别 ${captured.length} 张食材照片`}
            data-action="recognize-ingredients"
          >
            识别 {captured.length} 张照片
          </button>
        </div>
      )}

      <span className={styles.demoBadge}>Demo · 模拟拍照</span>
      {shooting && <div className={styles.flash} aria-hidden="true" />}

      {/* 拍摄完成 → 图片预览 → 继续拍 / 识别 */}
      {previewing && (
        <div className={styles.previewMask}>
          <div className={styles.previewCard}>
            <div className={styles.previewStill} aria-hidden="true" />
            <p className={styles.previewText}>
              <span className={styles.previewCheck} aria-hidden="true">
                <Icon name="check" size={13} strokeWidth={2.4} />
              </span>
              已拍下 {captured.length} 张
            </p>
            <div className={styles.previewActions}>
              <button
                type="button"
                className={styles.previewSecondary}
                onClick={handleContinue}
                data-action="continue-shooting"
              >
                继续拍
              </button>
              <button
                type="button"
                className={styles.previewPrimary}
                onClick={handleFinish}
                data-action="recognize-ingredients"
              >
                识别食材
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
