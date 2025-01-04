import { EditorToolsColor } from './partials/EditorToolsColor'
import { EditorToolsPalette } from './partials/EditorToolsPalette'
import styles from './ToolBox.module.scss'
import type { FC } from 'react'

export const ToolBox: FC = () => {
  return (
    <main className={styles.toolsBar}>
      <section className={styles.toolsBarHeader}>
        &gt;&gt;
      </section>
      <EditorToolsPalette />
      <EditorToolsColor />
    </main>
  )
}

