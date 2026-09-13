import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '@/components/AppShell';
import { Icon } from '@/components/Icon';
import { IngredientToken } from '@/components/IngredientToken';
import { ScreenHeader } from '@/components/ScreenHeader';
import { RECIPES } from '@/mock/recipes';
import { COOKWARE, SEASONINGS } from '@/mock/kitchen';
import { ALL_INGREDIENT_OPTIONS, useAppStore } from '@/store/AppStore';
import styles from './ProfilePage.module.css';

/* 我的厨房：可增删 / 自定义的管理控件（菜篮子、调料台、厨具通用）
   底部「编辑 / 完成」主按钮由卡片层面的固定 footer 渲染，本组件只负责内容区。
   非编辑态为只读（不显示删除按钮、不显示增项入口），编辑态才允许增删。 */
interface KitchenManagerProps<T extends { id: string; name: string }> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  onRemove: (id: string) => void;
  isEditing: boolean;
  emptyHint: string;
  /** 名称后追加的元信息（如菜篮子存量） */
  meta?: (item: T) => ReactNode;
  quickOptions: T[];
  renderOption: (item: T) => ReactNode;
  onAddOption: (item: T) => void;
  draftName: string;
  setDraftName: (v: string) => void;
  customPlaceholder: string;
  onAddCustom: () => void;
}

function KitchenManager<T extends { id: string; name: string }>({
  items,
  renderItem,
  onRemove,
  isEditing,
  emptyHint,
  meta,
  quickOptions,
  renderOption,
  onAddOption,
  draftName,
  setDraftName,
  customPlaceholder,
  onAddCustom,
}: KitchenManagerProps<T>) {
  return (
    <div className={styles.km}>
      {items.length === 0 && !isEditing ? (
        <p className={styles.kmEmpty}>{emptyHint}</p>
      ) : (
        <div className={styles.kmList}>
          {items.map((item) => (
            <div key={item.id} className={styles.kmItem}>
              {renderItem(item)}
              <span className={styles.kmName}>{item.name}</span>
              {meta ? meta(item) : null}
              {isEditing && (
                <button
                  type="button"
                  className={styles.kmRemove}
                  onClick={() => onRemove(item.id)}
                  aria-label={`删除 ${item.name}`}
                >
                  <Icon name="close" size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <>
          <p className={styles.kmHint}>快速添加</p>
          <div className={styles.kmGrid}>
            {quickOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={styles.kmQuick}
                onClick={() => onAddOption(opt)}
              >
                {renderOption(opt)}
                <span>{opt.name}</span>
                <Icon name="plus" size={12} strokeWidth={2.4} />
              </button>
            ))}
            {quickOptions.length === 0 && (
              <p className={styles.kmHintSub}>常用的都已经添加啦</p>
            )}
          </div>

          <p className={styles.kmHint}>或自定义</p>
          <div className={styles.kmCustom}>
            <input
              className={styles.kmInput}
              type="text"
              value={draftName}
              placeholder={customPlaceholder}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onAddCustom();
              }}
            />
            <button
              type="button"
              className={styles.kmCustomAdd}
              onClick={onAddCustom}
              disabled={!draftName.trim()}
            >
              添加
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const SETTINGS: Array<{ icon: Parameters<typeof Icon>[0]['name']; title: string; desc: string }> = [
  { icon: 'heart', title: '口味与忌口', desc: '不吃香菜 · 少辣' },
  { icon: 'scan', title: '识别记录', desc: '查看拍过的食材照片' },
  { icon: 'clock', title: '食材保鲜提醒', desc: '临期前提醒你吃掉' },
  { icon: 'leaf', title: '关于识朴', desc: 'Spoon · v0.1.0 Demo' },
];

type KitchenTab = 'pantry' | 'seasoning' | 'cookware';

const KITCHEN_TABS: { key: KitchenTab; label: string; icon: Parameters<typeof Icon>[0]['name'] }[] = [
  { key: 'pantry', label: '菜篮子', icon: 'basket' },
  { key: 'seasoning', label: '调料台', icon: 'sparkle' },
  { key: 'cookware', label: '厨具', icon: 'scan' },
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    pantry,
    seasonings,
    cookware,
    addToPantry,
    removeFromPantry,
    addCustomIngredient,
    toggleSeasoning,
    addCustomSeasoning,
    toggleCookware,
    addCustomCookware,
    favorites,
    history,
    resetFlow,
  } = useAppStore();
  const [toast, setToast] = useState<string | null>(null);
  const [kitchenTab, setKitchenTab] = useState<KitchenTab>('pantry');
  const [editingTab, setEditingTab] = useState<KitchenTab | null>(null);
  const [draftName, setDraftName] = useState('');

  const switchKitchenTab = (tab: KitchenTab) => {
    setKitchenTab(tab);
    setEditingTab(null);
    setDraftName('');
  };

  const submitCustom = (
    add: (name: string) => void,
    options?: { exists?: (name: string) => boolean },
  ) => {
    const trimmed = draftName.trim();
    if (!trimmed) return;
    if (options?.exists?.(trimmed)) {
      showToast('该项已经存在');
      return;
    }
    add(trimmed);
    setDraftName('');
  };

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1600);
  };

  const pantryIds = new Set(pantry.map((i) => i.id));
  const seasoningIds = new Set(seasonings.map((i) => i.id));
  const cookwareIds = new Set(cookware.map((i) => i.id));

  return (
    <AppShell header={<ScreenHeader title="我的" back={false} />} showTabBar className="fade-up">
      <div className={styles.page}>
        {/* 用户 */}
        <div className={styles.profile}>
          <span className={styles.avatar}>
            <Icon name="leaf" size={30} strokeWidth={1.6} style={{ color: 'var(--moss-deep)' }} />
          </span>
          <div>
            <p className={styles.name}>下厨的人</p>
            <p className={styles.desc}>把冰箱里的东西，做成一顿饭</p>
          </div>
        </div>

        {/* 统计 */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.statValue}>{history.length}</p>
            <p className={styles.statLabel}>做过</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statValue}>{favorites.length}</p>
            <p className={styles.statLabel}>收藏</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statValue}>{pantry.length}</p>
            <p className={styles.statLabel}>食材</p>
          </div>
        </div>

        {/* 我的厨房 */}
        <section>
          <h2 className={`section-title ${styles.sectionTitle}`}>我的厨房</h2>
          <div className={styles.kitchenCard} data-testid="kitchen-card">
            <div className={styles.kitchenTabs} role="tablist" aria-label="我的厨房">
              {KITCHEN_TABS.map((tab) => {
                const active = kitchenTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`${styles.kitchenTab} ${active ? styles.kitchenTabActive : ''}`}
                    onClick={() => switchKitchenTab(tab.key)}
                  >
                    <Icon name={tab.icon} size={16} strokeWidth={1.7} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className={styles.kitchenBody} role="tabpanel">
              {kitchenTab === 'pantry' && (
                <KitchenManager
                  items={pantry}
                  renderItem={(item) => <IngredientToken id={item.id} size={22} />}
                  onRemove={removeFromPantry}
                  isEditing={editingTab === 'pantry'}
                  emptyHint="还没有添加食材"
                  meta={(item) =>
                    item.stock !== undefined ? (
                      <span className={styles.kmStock}>
                        {item.stock}
                        {item.stockUnit ?? '份'}
                      </span>
                    ) : null
                  }
                  quickOptions={ALL_INGREDIENT_OPTIONS.filter((o) => !pantryIds.has(o.id))}
                  renderOption={(o) => <IngredientToken id={o.id} size={20} />}
                  onAddOption={(o) => addToPantry(o.id)}
                  draftName={draftName}
                  setDraftName={setDraftName}
                  customPlaceholder="自定义食材，如：虾仁"
                  onAddCustom={() =>
                    submitCustom(addCustomIngredient, {
                      exists: (name) => pantry.some((i) => i.name === name),
                    })
                  }
                />
              )}

              {kitchenTab === 'seasoning' && (
                <KitchenManager
                  items={seasonings}
                  renderItem={() => <span className={styles.kitchenDot} style={{ background: 'var(--clay)' }} />}
                  onRemove={(id) => {
                    const item = seasonings.find((s) => s.id === id);
                    if (item) toggleSeasoning(id);
                  }}
                  isEditing={editingTab === 'seasoning'}
                  emptyHint="还没有添加调料"
                  quickOptions={SEASONINGS.filter((s) => !seasoningIds.has(s.id))}
                  renderOption={() => <span className={styles.kitchenDot} style={{ background: 'var(--clay)' }} />}
                  onAddOption={(s) => toggleSeasoning(s.id)}
                  draftName={draftName}
                  setDraftName={setDraftName}
                  customPlaceholder="自定义调料，如：花椒油"
                  onAddCustom={() =>
                    submitCustom(addCustomSeasoning, {
                      exists: (name) => seasonings.some((s) => s.name === name),
                    })
                  }
                />
              )}

              {kitchenTab === 'cookware' && (
                <KitchenManager
                  items={cookware}
                  renderItem={() => <span className={styles.kitchenDot} style={{ background: 'var(--moss)' }} />}
                  onRemove={(id) => {
                    const item = cookware.find((c) => c.id === id);
                    if (item) toggleCookware(id);
                  }}
                  isEditing={editingTab === 'cookware'}
                  emptyHint="还没有添加厨具"
                  quickOptions={COOKWARE.filter((c) => !cookwareIds.has(c.id))}
                  renderOption={() => <span className={styles.kitchenDot} style={{ background: 'var(--moss)' }} />}
                  onAddOption={(c) => toggleCookware(c.id)}
                  draftName={draftName}
                  setDraftName={setDraftName}
                  customPlaceholder="自定义厨具，如：空气炸锅"
                  onAddCustom={() =>
                    submitCustom(addCustomCookware, {
                      exists: (name) => cookware.some((c) => c.name === name),
                    })
                  }
                />
              )}
            </div>

            <div className={styles.kitchenFooter}>
              {editingTab === kitchenTab ? (
                <button
                  type="button"
                  className={styles.kmDoneWide}
                  onClick={() => {
                    setEditingTab(null);
                    setDraftName('');
                  }}
                >
                  完成
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.kmEditWide}
                  onClick={() => setEditingTab(kitchenTab)}
                >
                  <Icon name="edit" size={16} strokeWidth={2} />
                  编辑
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 做菜笔记 */}
        <section>
          <h2 className={`section-title ${styles.sectionTitle}`}>做菜笔记</h2>
          {history.length > 0 ? (
            <div className={styles.list}>
              {history.map((entry) => {
                const date = new Date(entry.createdAt);
                const recipe = RECIPES.find((item) => item.id === entry.recipeId);
                return (
                  <button
                    key={entry.id}
                    type="button"
                    className={styles.item}
                    onClick={() => navigate(`/recipe/${entry.recipeId}`)}
                  >
                    <span className={styles.itemIcon}>
                      <IngredientToken
                        id={recipe?.ingredientIds[0] ?? ''}
                        size={26}
                        className={styles.itemIllu}
                      />
                    </span>
                    <span className={styles.itemBody}>
                      <span className={styles.itemTitle} style={{ display: 'block' }}>
                        {entry.recipeName}
                      </span>
                      <span className={styles.itemDesc} style={{ display: 'block' }}>
                        {date.getMonth() + 1}/{date.getDate()} · {entry.ingredientNames.join('、')}
                      </span>
                    </span>
                    <Icon name="chevronRight" size={16} className={styles.itemArrow} />
                  </button>
                );
              })}
            </div>
          ) : (
            <p className={styles.empty}>还没有记录，去拍一张食材试试。</p>
          )}
        </section>

        {/* 设置 */}
        <section>
          <h2 className={`section-title ${styles.sectionTitle}`}>设置</h2>
          <div className={styles.list}>
            {SETTINGS.map((item) => (
              <button
                key={item.title}
                type="button"
                className={styles.item}
                onClick={() => showToast('Demo 阶段暂未开放')}
              >
                <span className={styles.itemIcon}>
                  <Icon name={item.icon} size={18} strokeWidth={1.7} />
                </span>
                <span className={styles.itemBody}>
                  <span className={styles.itemTitle} style={{ display: 'block' }}>
                    {item.title}
                  </span>
                  <span className={styles.itemDesc} style={{ display: 'block' }}>
                    {item.desc}
                  </span>
                </span>
                <Icon name="chevronRight" size={16} className={styles.itemArrow} />
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className={styles.danger}
          onClick={() => {
            resetFlow();
            showToast('已重置本轮流程数据');
          }}
        >
          重置本轮识别数据
        </button>

        <p className={styles.footnote}>
          识朴 Spoon · v0.1.0 Demo
          <br />
          拍照与识别均为模拟数据，未接入真实模型
        </p>
      </div>

      {toast && <div className={styles.toast}>{toast}</div>}
    </AppShell>
  );
}
